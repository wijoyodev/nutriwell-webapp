import React from "react";
import { Row, Col, Table } from 'react-bootstrap';
import styles from './BaseTable.module.scss';
import 'rsuite/dist/rsuite.min.css';
import { RiCheckLine } from 'react-icons/ri'
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import { toRupiah } from 'to-rupiah';
import Pagination, { bootstrap5PaginationPreset } from 'react-responsive-pagination';

const BaseTable = ({
  data,
  linkDetail,
  pagination,
  totalNetIncome,
  totalGrossIncome,
  section,
  activePage,
  handlePageChange,
  memberId,
}) => {


  const printSection = (index, data, title) => {
    if( title === "STATUS" ){
      return (
        <td key={index}>
          { printStatusLabel(data) }
        </td>
      )
    }else{
      return (
        <td key={index}>
          { printData(data, title) }
        </td>
      )
    }
  }

  const printStatusLabel = (status) => {
    if( section === "orderManagement" ){
      if( status === "Selesai" ){
        return <p className={`${styles.statusDone} ${styles.buttonStatus}`}> Selesai </p>
      } else if( status === "Belum Bayar" ){
        return <p className={`${styles.statusNotPaid} ${styles.buttonStatus}`}> Belum Bayar </p>
      } else if( status === "Dikemas" ){
        return <p className={`${styles.statusPacking} ${styles.buttonStatus}`}> Dikemas </p>
      } else if( status === "Dikirim" ){
        return <p className={`${styles.statusDelivered} ${styles.buttonStatus}`}> Dikirim </p>
      } else if( status === "Dibatalkan" ){
        return <p className={`${styles.statusCancelled} ${styles.buttonStatus}`}> Dibatalkan </p>
      } else {
        return <p className={`${styles.statusDone} ${styles.buttonStatus}`}> Selesai </p>
      }
    }else if( section === "disbursement" ){
      if( status === "COMPLETED" ){
        return <p className={`${styles.statusDone} ${styles.buttonStatus}`}> Berhasil </p>
      } else if( status === "Pending"  || status === "PENDING" ){
        return <p className={`${styles.statusNotPaid} ${styles.buttonStatus}`}> Pending </p>
      } else if( status === "FAILED"){
        return <p className={`${styles.statusCancelled} ${styles.buttonStatus}`}> Gagal </p>
      } 
    }else if( section === "adminManagement" ){
      if( status === 1 ){
        return <p className={`${styles.statusDone} ${styles.buttonStatus}`}> Active </p>
      } else if( status === 2 ){
        return <p className={`${styles.statusNotPaid} ${styles.buttonStatus}`}> Inactive </p>
      }
    }
  }

  const printDate = (unix) => {
    const date = new Date(unix);
    const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formatter.format(date);
  }

  const printData = (data, title) => {
    if( title === "Total Komisi" || title === "Net Income" || title === "Jumlah"  ){
      return <p className={styles.data_row}> {toRupiah(data)} </p>
    }else if( title === "Tanggal" || title === "TANGGAL" ){
      return <p className={styles.data_row}> {printDate(data)}</p>
    }else{
      return <p className={styles.data_row}> {data} </p>
      // return <p className={styles.data_row}> {data[title]} </p>
    }
  }

  const linkToDetail = (section, link, id, memberId, disbursementId) => {
    if( section === "disbursementMember" ){
      return link + memberId + `/${id}` 
    }else if( section === "disbursement" ){
      return link + disbursementId + `/${id}` 
    }else{
      return link + id
    }
  }

	return (
    data && 
    <>
      <Row>
        <Table className={styles.table}>
          <thead>
            <tr className={styles.table_head}>
              { Object.keys(data[0]).map( (item,index) => (
                !item.includes("HIDDEN") && (
                  <th key={index}>
                    <p className={styles.th_text}> {item} </p>
                  </th>
                )
              ))}
              {linkDetail && 
                <th>
                  ACTION
                </th>
              }
            </tr>
          </thead>
          <tbody>
          { data.map((oneData, index) => (
            <tr key={index}>
              { Object.keys(oneData).map( (item,index) => (
                !item.includes("HIDDEN") && (
                  section === "disbursementMember" || section === "RewardTable" ||
                  section === "orderManagement" || section === "adminManagement" || 
                  section === "salesReport" || section === "disbursement" || 
                  section === "referenceNetwork" ? 
                    <>
                      { printSection(index, oneData[item], item) }
                    </>
                    :
                    <>
                      {item === "STATUS" ? 
                        <td key={index}>
                          {oneData['STATUS'] ?
                            <p className={styles.verif}> <RiCheckLine/> Verified </p>
                          :
                            <p className={styles.notVerif}> Not Verified </p>
                          }
                        </td>
                        :
                        <td key={index}>
                          { printData(oneData, item) }
                        </td>
                      }
                    </>
                  )
                ))}
                { linkDetail &&
                  <td>
                    <Link to={linkToDetail(section, linkDetail, oneData["ID"], memberId, oneData['HIDDEN user_id'])} className={styles.no_underline}>
                      <p className={styles.detail}><BiSearchAlt/></p>
                    </Link>
                  </td>
                }
              </tr>
          ))}
          </tbody>
        </Table>
      </Row>
      <Row className={"mt-3"}>
        <Col xs="6">
          <Pagination
            {...bootstrap5PaginationPreset}
            className={"pagination text-left"}
            current={activePage}
            total={Math.ceil(pagination.total/pagination.limit)}
            onPageChange={(e)=>handlePageChange(e)}
          />
        </Col>
        {/* <Col xs={{span:1, offset:2 }}>
          <Form.Select aria-label="Default select example" className={styles.total_data} >
            <option>{"10"}</option>
            <option>{"20"}</option>
            <option>{"30"}</option>
            <option>{"40"}</option>
          </Form.Select>
        </Col> */}
        { section === "salesReport" ?
          <>
            <Col xs={{span: "2"}} className={styles.page_data}>
              <p className="text-right">
                Total Net Income:
                <br/>
                <strong>{toRupiah(totalNetIncome)}</strong>
              </p>
            </Col>
            <Col xs={{span: "3"}} className={styles.page_data}>
              <p className="text-right">
                Total Gross Income :
                <br/>
                <strong>{toRupiah(totalGrossIncome)}</strong>
              </p>
            </Col>
            <Col xs={{span: "1"}} className={styles.page_data}>
              <p className="text-right">
                Total:
                <br/>
                <strong>{pagination.total} data</strong>
              </p>
            </Col>
          </>
          :
          <Col xs={{span: "2", offset: "4"}} className={styles.page_data}>
            <p>
              Total: {pagination.total} data
            </p>
          </Col> 
        }
      </Row>
    </>
	);
};

export default BaseTable;
