export type UserToken = {
  MaThanhVien: string;
  TenDangNhap: string;
  id: string;
  name: string;
};

export type ChucVu = {
  MaChucVu: string;
  id: string;
  name: string;
};
export interface UserInfo extends UserToken {
  QuyenPhanCongThanhVien: boolean;
  QuyenPhanQuyenKhaiThac: boolean;
  TrangThai: string;
  TrongSo: number;
  VaiTro: string;
  ChucVu: ChucVu;
  DanhSachPhanQuyenMaDonViKiemToan: string[];
  sub: string;
}
