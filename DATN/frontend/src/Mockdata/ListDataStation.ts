import { StationType } from '@/types/station';
import WaterMeterImg from '@assets/images/waterMeter.png';
import WaterMeterElectricImg from '@assets/images/electricWaterMeter.png';

export const dataStation: StationType[] = [
  {
    id: 1,
    name: 'Đai học Bách Khoa',
    address: '268, Lý Thường Kiệt, Quận 10',
    devices: 3,
    installationAt: '12/12/2022',
    status: 1,
    consumePerDay: 1000,
    threshold: 10000,
    thumbnail: WaterMeterImg,
  },
  {
    id: 2,
    name: 'Đai học Khoa Học Tự Nhiên',
    address: '168, Lý Thường Kiệt, Quận 5',
    devices: 3,
    installationAt: '1/1/2022',
    status: 1,
    consumePerDay: 2300,
    threshold: 30000,
    thumbnail: WaterMeterImg,
  },
  {
    id: 3,
    name: 'Đai học Sư Phạm Kỹ Thuật',
    address: '1, Võ Văn Ngân, Thủ Đức',
    devices: 1,
    installationAt: '12/11/2022',
    status: 0,
    consumePerDay: 550,
    threshold: 12000,
    thumbnail: WaterMeterElectricImg,
  },
];
