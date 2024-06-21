import React, { useEffect, useState } from "react";
import MainFormMember from '../components/MainFormMember/MainFormMember'
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { setDetailMember } from '../store/actions/memberAction'

const MemberDetailPage = ({ dispatch, dataMember }) => {
  const { memberId } = useParams()
  const [oneMember, setOneMember] = useState(null);

  useEffect(()=>{
    if( dataMember.detailMemberResp ){
      let data = dataMember.detailMemberResp
      setOneMember(data)
    }
  },[dataMember.detailMemberResp])

  useEffect(()=>{
    setDetailMember(dispatch, memberId)
  },[dispatch, memberId])

  return (    
    oneMember && 
    <div className="container_right_form">
      <MainFormMember
        pageName={"Detail Member"}
        linkAccReview={"../accountReview"}
        dataOneMember={oneMember}
        pageFor={"detail"}
        whiteBackground={true}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataMember: state.member,
  };
};

export default connect(
  storage
)(MemberDetailPage)
