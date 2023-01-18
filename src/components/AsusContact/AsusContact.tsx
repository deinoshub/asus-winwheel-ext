import React from "react";

import  { Button, Container, Image, Paragraph } from "../../styled";

import contactAsset from "../../assets/contact.png";

interface AsusContactProps {
  onClick?: () => void;
}

const AsusContact = (props: AsusContactProps) => {
  return (
    <Container>
      <br />
      <Image src={contactAsset} alt="icon" />
      <Paragraph
        style={{ textAlign: "center", color: "black", fontWeight: 400 }}
      >
        ASUS đã ghi nhận thông tin của bạn và sẽ liên hệ lại sau.
      </Paragraph>
      <Paragraph style={{ textAlign: "center" }}>
        Mọi khiếu nại, phản ánh vui lòng liên hệ hotline và fanpage ASUS trước
        ngày 15/03/2023.
      </Paragraph>
      <br />
      <Button onClick={props.onClick}>Đóng</Button>
    </Container>
  );
}

export default AsusContact;
