export type DonViDuocKiemToan = {
  MaDonViDuocKiemToan: string;
  id: string;
  name: string;
};

export type DonViKiemToan = {
  MaDonViKiemToan: string;
  id: string;
  name: string;
};

export type LanhDao = {
  GioiTinh: string;
  LoaiChucVu: string;
  MaCuocKiemToan: string;
  MaThanhVien: string;
  TenDangNhap: string;
  id: string;
  name: string;
};

export type ThanhVienCKT = {
  GioiTinh: string;
  LoaiChucVu: string;
  MaCuocKiemToan: string;
  MaThanhVien: string;
  MaToKiemToan: string;
  TenDangNhap: string;
  id: string;
  name: string;
};
export type ToKiemToan = {
  MaCuocKiemToan: string;
  MaToKiemToan: string;
  id: string;
  name: string;
};

export type ThanhVienTheoTo = {
  DsThanhVien: ThanhVienCKT[];
  ToKiemToan: ToKiemToan;
};
export type TruongDoan = {
  GioiTinh: string;
  LoaiChucVu: string;
  MaThanhVien: string;
  TenDangNhap: string;
  id: string;
  name: string;
};
export type CuocKiemToan = {
  ChiTietTrangThai: string;
  DanhSachDauMoiKiemToan: [];
  DanhSachDonViDuocKiemToan: DonViDuocKiemToan[];
  DanhSachLanhDao: LanhDao[];
  DanhSachThanhVien: ThanhVienCKT[];
  DanhSachThanhVienTheoToKiemToan: ThanhVienTheoTo[];
  DanhSachToKiemToan: ToKiemToan[];
  DonViKiemToan: DonViKiemToan[];
  MaCuocKiemToan: string;
  MaDauMoiKiemToan: string[];
  MaDonViKiemToan: string;
  MaLinhVucKiemToan: string;
  MaPhuongAnKiemToan: string;
  MaTruongDoan: string;
  NamKiemToan: string;
  NgayBatDauKiemToan: string;
  NgayKetThucKiemToan: string;
  NienDoKiemToan: string;
  PhanCong: string;
  SoNgayKiemToan: string;
  SoQuyetDinh: string;
  TrangThai: string;
  TrangThaiCuocKiemToan: string;
  TrangThaiYeuCau: string;
  TruongDoan: TruongDoan;
  createdAt: string;
  id: string;
  isAccess: string;
  name: string;
  updatedAt: string;
};
