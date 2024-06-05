import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import styles from './BaseTable.module.scss';
import 'rsuite/dist/rsuite.min.css';
import { RiCheckLine } from 'react-icons/ri'
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import Pagination, { bootstrap5PaginationPreset } from 'react-responsive-pagination';

const BaseTable = ({
  data,
  linkDetail,
  pagination,
  section,
  activePage,
  handlePageChange,
}) => {

  console.log("MASUK BASE TABLE", data)

  const printSection = (index, data, title) => {
    console.log("masuk printsection", index, data, title)
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

  // const printRoleLabel = (role) => {
  //   if( role === 1 ){
  //     return <p> Super Admin </p>
  //   }else if( role === 2 ){
  //     return <p> Manager </p>
  //   }else if( role === 3 ){
  //     return <p> Admin Packing </p>
  //   }
  // }

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
      } else if( status === "Pending" ){
        return <p className={`${styles.statusNotPaid} ${styles.buttonStatus}`}> Pending </p>
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
    console.log(date, unix, "<<<")
    const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formatter.format(date);
  }

  const printData = (data, title) => {
    if( title == "Total Komisi" ){
      return <p className={styles.data_row}> {"Rp. "  + data} </p>
    }else if( title == "Tanggal" ){
      console.log("printData", data,title, data[title])
      return <p className={styles.data_row}> {printDate(data)}</p>
    }else{
      return <p className={styles.data_row}> {data} </p>
      // return <p className={styles.data_row}> {data[title]} </p>
    }
  }

	useEffect(()=>{
	},[])

	return (
    data && 
    <>
      <Row>
        <Table className={styles.table}>
          <thead>
            <tr className={styles.table_head}>
              { Object.keys(data[0]).map( (item,index) => (
                <th key={index}>
                  <p className={styles.th_text}> {item} </p>
                </th>
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
            {console.log("oneData>> ", oneData)}
              { Object.keys(oneData).map( (item,index) => (
                section === "RewardTable" ||section === "orderManagement" || section === "adminManagement" || section === "salesReport" || section === "disbursement" || section === "referenceNetwork" ? 
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
                ))}
              { linkDetail &&
                <td>
                  <Link to={linkDetail + (oneData["ID"] || oneData["ADMIN ID"])} className={styles.no_underline}>
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
        <Col xs={{span: "2", offset: "4"}} className={styles.page_data}>
          <p>
            {`Total: ${pagination.total} data`}
          </p>
        </Col>
      </Row>
    </>
	);
};

export default BaseTable;
