import React, { useState } from "react";
import { Row, Table } from 'react-bootstrap';
import styles from './BaseTableDnD.module.scss';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { CgMenuGridR } from 'react-icons/cg'
import { Link } from "react-router-dom";  
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';

const BaseTableDnD = ({
  data,
  linkDetail,
  reorderState,
  setTempOrder,
}) => {

  const SortableItem = SortableElement(({value}) => 
    <tr>
      { reorderState &&
        <td>
          <CgMenuGridR/>
        </td>
      }
      <td>
        <p className={styles.data_row}> {value.orderNum} </p>
      </td>
      <td>
        <p className={styles.data_row}> {value.imageUrl} </p>
      </td>
      <td>
        <p className={styles.data_row}> {value.title} </p>
      </td>
      { !reorderState &&
        <td className={styles.move_forward}>
          <Link to={linkDetail + data["companyID"]} className={styles.no_underline}>
            <p className={styles.detail}><BiSearchAlt/></p>
          </Link>
        </td>
      }
    </tr>
  );

  const SortableList = SortableContainer(({items}) => {
    return (
      <tbody>
        { items.map((value, index) => (
          <SortableItem key={value.id} index={index} value={value} />
        ))}
       </tbody>
    );
  });

  const [state, setState] = useState({
    items: data,
  });

  const onSortEnd = ({oldIndex, newIndex}) => {
    let curr = arrayMoveImmutable(state.items, oldIndex, newIndex)
    setState({items: curr})
    setTempOrder(curr)
  };

	return (
    <>
      <Row>
        <Table className={styles.table}>
          <thead>
            <tr className={styles.table_head}>
              {reorderState && 
                <th >
                  <p className={styles.th_text}> DRAG ORDER </p>
                </th>
              }
              <th>
                <p className={styles.th_text}> {"ORDER NUM"} </p>
              </th>
              <th>
                <p className={styles.th_text}> {"BANNER"} </p>
              </th>
              <th>
                <p className={styles.th_text}> {"TITLE"} </p>
              </th>
              
              { !reorderState && 
                <th>
                  ACTION
                </th>
              }
            </tr>
          </thead>
          { reorderState ? 
            <SortableList items={state.items} onSortEnd={(e)=>onSortEnd(e)}/>
            :
            <tbody>
              { data.map((data, index) => (
                <tr key={index} >
                  <td className={styles.vertical_middle}>
                    <p className={styles.data_row + ' pl-3'}>{data.orderNum}</p>
                  </td>
                  <td className={styles.vertical_middle}>
                    <img alt={"images"} className={styles.data_row_image} src={data.imageUrl}/>
                  </td>
                  <td className={styles.vertical_middle}>
                    <p className={styles.data_row}>{data.title}</p>
                  </td>
                  <td className={styles.vertical_middle}>
                    <Link to={linkDetail + data["id"]} className={styles.no_underline}>
                      <p className={styles.detail}><BiSearchAlt/></p>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </Table>
      </Row>
      <Row>
      </Row>
      {/* <Row className={"mt-3"}>
        <Col xs="6">
        </Col>
        <Col xs={{span:1, offset:2 }}>
          <Form.Select aria-label="Default select example" className={styles.total_data} >
            <option>{"10"}</option>
            <option>{"20"}</option>
            <option>{"30"}</option>
            <option>{"40"}</option>
          </Form.Select>
        </Col>
        <Col xs="3" className={styles.page_data}>
          <p>
            Showing 131 - 140 of 350
          </p>
        </Col>
      </Row> */}
    </>
	);
};

export default BaseTableDnD;
