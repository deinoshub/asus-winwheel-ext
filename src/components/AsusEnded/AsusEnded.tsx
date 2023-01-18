import React from "react";

import { Button, Container, Image, Paragraph } from "../../styled";

import emptyAsset from "../../assets/empty.png";

interface AsusEndedProps {
  onClick?: () => void;
}

const AsusEnded = (props: AsusEndedProps) => {
  return (
    <Container>
      <br />
      <Image src={emptyAsset} alt="icon" />
      <Paragraph
        style={{ textAlign: "center", color: "black", fontWeight: 400 }}
      >
        Chương trình đã kết thúc!
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

export default AsusEnded;
