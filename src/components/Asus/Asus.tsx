import React, { useCallback, useMemo, useRef, useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";

import AsusContact from "../AsusContact";
import AsusResult from "../AsusResult";
import AsusWinwheel, { AsusWinwheelInstance } from "../AsusWinwheel";

import { Button, Container, Paragraph, Title } from "../../styled";

enum AsusState {
  started,
  spinned,
  contacted,
}

export interface AsusProps {
  segment: number;
  onClose?: () => void;
  width?: number;
  height?: number;
}

const Asus = ({ segment, onClose, width, height }: AsusProps) => {
  const [state, setState] = useState<AsusState>(
    segment > 0 ? AsusState.started : AsusState.contacted
  );
  const asusSegmentNumber = useMemo(() => segment, [segment]);
  const asusRef = useRef<AsusWinwheelInstance>(null!);

  const handleWinwheelFinished = useCallback((_: number) => {
    setState(AsusState.spinned);
  }, []);

  if (state === AsusState.spinned) {
    return <AsusResult onClick={onClose} segment={asusSegmentNumber} />;
  }

  if (state === AsusState.contacted) {
    return <AsusContact onClick={onClose} />;
  }

  return (
    <Container>
      <Title>VÒNG QUAY MAY MẮN</Title>
      <AsusWinwheel
        ref={asusRef}
        width={width ?? 480}
        height={height ?? 480}
        onFinished={handleWinwheelFinished}
      />
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
          - Giải thưởng quà 100% trúng bao gồm: bộ vệ sinh laptop, pin sạc dự
          phòng, bình nước ASUS, voucher mua sắm Gotit 200,000đ, voucher mua sắm
          Gotit 300,000đ.
        </Paragraph>
        <Paragraph>
          - Mỗi khách hàng chỉ được tham gia bốc thăm 1 lần cho mỗi cơ hội trúng
          giải, Serial Number (S/N) sẽ được chọn làm số bốc thăm cho giải màn
          hình 24" tuần kế tiếp đối với khách mua hàng trực tiếp tại 10 đại lý
          áp dụng.
        </Paragraph>
      </Scrollbar>
      <br />
      <Button
        onClick={() => {
          const asusInstance = asusRef.current;
          if (asusInstance && !asusInstance.isSpinning) {
            asusInstance.spin(asusSegmentNumber);
          }
        }}
      >
        Bắt đầu
      </Button>
    </Container>
  );
};

export default Asus;
