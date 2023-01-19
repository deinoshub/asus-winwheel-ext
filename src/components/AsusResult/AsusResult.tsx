import React from "react";
import { Scrollbar } from "react-scrollbars-custom";

import { Button, Container, Image, Note, Paragraph } from "../../styled";

import gift1Asset from "../../assets/gift1.png";
import gift2Asset from "../../assets/gift2.png";
import gift3Asset from "../../assets/gift3.png";
import gift4Asset from "../../assets/gift4.png";
import gift5Asset from "../../assets/gift5.png";

interface AsusResultProps {
  segment: number;
  onClick?: () => void;
}

const AsusResult = (props: AsusResultProps) => {
  let srcAsset: string = null!;

  switch (props.segment) {
    case 1:
      srcAsset = gift1Asset;
      break;
    case 2:
      srcAsset = gift2Asset;
      break;
    case 3:
      srcAsset = gift3Asset;
      break;
    case 4:
      srcAsset = gift4Asset;
      break;
    case 5:
      srcAsset = gift5Asset;
      break;
  }

  return (
    <Container>
      <Image src={srcAsset} alt="Quà tặng" style={{ maxWidth: "100%" }} />
      <Note>Lưu ý:</Note>
      <Scrollbar
        style={{
          height: "160px",
          boxShadow: "inset 0px -7px 7px -10px rgba(240,231,231,0.7)",
        }}
        noDefaultStyles={false}
        noScrollX
        trackYProps={{
          style: {
            backgroundColor: "transparent",
            width: 6,
          },
        }}
        thumbYProps={{
          style: {
            backgroundColor: "#D0D7EB",
            width: 6,
          },
        }}
      >
        <Paragraph>
          - ASUS sẽ kiểm tra và liên hệ để gửi quà đến địa chỉ mà khách hàng
          cung cấp trong vòng 7-15 ngày làm việc (không kể ngày lễ, thứ 7 & chủ
          nhật). Vì một số lí do khách quan không mong muốn (thiên tai, dịch
          bệnh,...), quà có thể được vận chuyển đến chậm hơn so với dự kiến.
        </Paragraph>
        <Paragraph>
          - Ngày cuối cùng nhận khiếu nại: 15/03/2022. ASUS sẽ không giải quyết
          bất kỳ trường hợp khiếu nại nào liên quan đến chương trình sau thời
          gian này.
        </Paragraph>
        <Paragraph>
          - Quà tặng không có giá trị quy đổi thành tiền mặt hoặc các giá trị
          khác tương đương.
        </Paragraph>
      </Scrollbar>
      <br />
      <Button onClick={props.onClick}>Xác nhận</Button>
    </Container>
  );
};

export default AsusResult;
