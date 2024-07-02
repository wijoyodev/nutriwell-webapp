import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { Row } from 'react-bootstrap'
import { Document, Page, Text, StyleSheet, PDFViewer, Image, } from '@react-pdf/renderer';


const InvoicePage = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      marginLeft: 12,
    },
    body: {
      paddingRight: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      backgroundImage: "url('../../public//images//header.png')",
      height: "100vh",
      backgroundPosition: "center",
      backgroundColor: "#062E47",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    imageHeader: {
      height: "160px", 
      width: "600px",
      marginBottom: 50,
    },
    imageFooter: {
      height: "90px", 
      width: "600px",
      marginTop: 80,
    },
    subtitle: {
      marginLeft: 34,
      marginBottom: 4,
      fontSize: 14,
      textAlign: 'justify',
      color: "black",
      color: "grey",
    },
    text: {
      marginLeft: 50,
      fontSize: 14,
      textAlign: 'justify',
      color: "black",
    },
    title: {
      margin: 12,
      marginLeft: 22,
      fontWeight: 900,
      fontSize: 18,
      textAlign: 'justify',
    }
  });

  const [datas, setDatas] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    setIsLoading(true)
    setDatas(JSON.parse( localStorage.getItem("dataInvoice") ) );
    setIsLoading(false)
  },[])

  const MyDocument = ({datas}) => {
    return(
      <>
        <Document className={"mt-5"}>
          <Page style={styles.body}>
            <Image
              style={styles.imageHeader}
              src="/images/header.png"
            />
            <Text style={styles.title}>NOTA PESANAN</Text>
            <Text style={styles.subtitle}>NO. PESANAN &#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;: 
              <Text style={styles.text}>
                &nbsp; {datas.order_number} 
              </Text>
            </Text>
            <Text style={styles.subtitle}>TOTAL PEMBAYARAN &#09;&#09;&#09;:
              <Text style={styles.text}>
                &nbsp; Rp {datas.total_purchase}
              </Text>
            </Text>
            <Text style={styles.subtitle}>WAKTU PEMBAYARAN &#09;: 
              <Text style={styles.text}>
                &nbsp; {datas.payment_date}
              </Text>
            </Text>
            <Text style={styles.subtitle}>PENGIRIM   &#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;: </Text>
            <Text style={styles.text}>
              {datas.user_detail.full_name} , {datas.user_detail.phone_number} , {datas.user_detail.address_detail} , {datas.user_detail.district}  , {datas.user_detail.city}  , {datas.user_detail.province} 
            </Text>
            <Text style={styles.title}>
              ---------------------------------------------------------------------------------------------
            </Text>
            <Text style={styles.title}>RINCIAN PESANAN</Text>
            <Text style={styles.subtitle}>PRODUK &#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;: 
              <Text style={styles.text}>
                &nbsp; {datas.product_detail.product_name}
              </Text>
            </Text>
            <Text style={styles.subtitle}>HARGA &#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;: 
              <Text style={styles.text}>
                &nbsp; Rp {datas.product_detail.price_after_tax}
              </Text>
            </Text>
            <Text style={styles.subtitle}>JUMLAH &#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;: 
              <Text style={styles.text}>
                &nbsp; {datas.product_detail.quantity}
              </Text>
            </Text>
            <Text style={styles.subtitle}>SUBTOTAL &#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;: 
              <Text style={styles.text}>
                &nbsp; Rp {datas.product_detail.total_price}
              </Text>
            </Text>
            <Text style={styles.subtitle}>ONGKIR &#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;:
              <Text style={styles.text}>
                &nbsp; Rp {datas.shippingFee}
              </Text>
            </Text>
            <Text style={styles.subtitle}>TOTAL PEMBAYARAN : 
              <Text style={styles.text}>
                &nbsp; Rp {datas.courier_rate}
              </Text>
            </Text>
            <Text style={styles.title}>
              ---------------------------------------------------------------------------------------------
            </Text>
            <Text style={styles.subtitle}>KURIR &#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;: 
              <Text style={styles.text}>
                &nbsp; {datas.courier_company}
              </Text>
            </Text>
            <Text style={styles.subtitle}>METODE PEMBAYARAN : 
              <Text style={styles.text}>
                &nbsp; {datas.payment_method}
              </Text>
            </Text>
            <Image
              style={styles.imageFooter}
              src="/images/footer.png"
            />
          </Page>
        </Document>
      </>
    )
  };

  const download = (e) => {
    e.preventDefault()
    ReactDOM.render(<MyDocument />, `Desktop/example.pdf`);
  }

  return (    
    <>
      { !isLoading && 
        <Row className="invoiceContainer text-center">
          <PDFViewer className="mt-5">
            <MyDocument datas={datas}/>
          </PDFViewer>
        </Row>
      }
    </>
  );
};

export default InvoicePage;
