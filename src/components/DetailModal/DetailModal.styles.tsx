import styled from 'styled-components';

export const  ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5);
	z-index: 1000;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	overflow-y: auto;
	padding: 50px 20px;
`;

export const  ModalContent = styled.div`
	background: white;
	width: 100%;
	max-width: 800px;
	border-radius: 20px;
	box-shadow: 0 20px 40px rgba(0,0,0,0.3);
	animation: slideIn 0.3s ease;
	display: flex;
	flex-direction: column;
	max-height: calc(100vh - 100px);
`;

export const  ModalHeader = styled.div`
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	padding: 30px;
	position: relative;
	
	h2 {
		font-size: 28px;
		margin: 0;
		padding-right: 40px;
	}
`;

export const  ModalCloseButton = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	background: none;
	border: none;
	font-size: 30px;
	line-height: 1;
	color: white;
	cursor: pointer;
	opacity: 0.8;
	transition: opacity 0.3s ease;
	&:hover {
		opacity: 1;
	}
`;

export const  ModalBody = styled.div`
	padding: 40px;
	overflow-y: auto;
`;

export const  DetailSection = styled.section`
	margin-bottom: 30px;
	&:last-child {
			margin-bottom: 0;
	}
	h3 {
		font-size: 20px;
		font-weight: 600;
		color: #1f2937;
		margin-bottom: 15px;
		padding-bottom: 10px;
		border-bottom: 2px solid #f3f4f6;
	}
`;

export const  DetailGrid = styled.div`
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
`;

export const  DetailItem = styled.div`
	display: flex;
	flex-direction: column;
`;

export const  DetailLabel = styled.span`
	font-size: 12px;
	font-weight: 600;
	color: #6b7280;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 4px;
`;

export const  DetailValue = styled.span`
	font-size: 14px;
	color: #374151;
	font-weight: 500;
	word-break: break-word;
	
	a {
			color: #667eea;
			text-decoration: none;
			&:hover {
					text-decoration: underline;
			}
	}
`;

export const  BusinessNamesList = styled.div`
	background: #f9fafb;
	border-radius: 10px;
	padding: 15px;
	margin-top: 10px;
`;

export const  BusinessNameItem = styled.div`
	padding: 8px 0;
	border-bottom: 1px solid #e5e7eb;
	&:last-child {
		border-bottom: none;
	}
`;