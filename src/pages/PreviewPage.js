import React, { useEffect } from "react";
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLeft } from 'react-icons/ai';
import ImageUploading from "react-images-uploading";
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Preview from "../components/Marine/Preview/Index";

const PreviewPage = () => {

	useEffect(()=>{
	},[])

	return (
		<div>
      <Preview/>
		</div>
	);
};

export default PreviewPage;
