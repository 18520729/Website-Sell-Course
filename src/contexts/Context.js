import { createContext, useState, useEffect } from "react";
import { variables } from "../Variables";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(null);
  const [khoaHoc, setKhoaHoc] = useState([]);
  const [giaoVien, setGiaoVien] = useState([]);
  const [baiGiang, setBaiGiang] = useState([]);
  const [hocVien, setHocVien] = useState([]);
  const [khoaHocHocVien, setKhoaHocHocVien] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [fetchComment, setFetchComment] = useState([]);

  const [dataSearch, setDataSearch] = useState("");
  const [dataCart, setDataCart] = useState([]);
  const [gioHang, setGioHang] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [test, setTest] = useState(0);

  const tenGiaoVien = (maGiaoVienInCourse, giaovien) => {
    for (let i in giaovien) {
      if (giaovien[i].MaGiaoVien.toString() === maGiaoVienInCourse) {
        return giaovien[i].TenGiaoVien;
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("18520729")) {
      setLoginStatus(JSON.parse(localStorage.getItem("18520729")));
    }
    fetch(variables.API_URL + "khoahoc/")
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(variables.API_URL + "giaovien/")
      .then((response) => response.json())
      .then((data) => {
        setGiaoVien(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(variables.API_URL + "baigiang/")
      .then((response) => response.json())
      .then((data) => {
        setBaiGiang(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(variables.API_URL + "hocvien/")
      .then((response) => response.json())
      .then((data) => {
        setHocVien(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(variables.API_URL + "khoahochocvien/")
      .then((response) => response.json())
      .then((data) => {
        setKhoaHocHocVien(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(variables.API_URL + "binhluan/")
      .then((response) => response.json())
      .then((data) => {
        setFetchComment(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(variables.API_URL + "giohang/")
      .then((response) => response.json())
      .then((data) => {
        setGioHang(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (loginStatus) {
      let arrCourse = [];
      const arrKhoaHocHocVien = khoaHocHocVien.filter((item) => {
        return loginStatus.MaHocVien === Number(item.MaHocVien);
      });
      for (let i of arrKhoaHocHocVien) {
        arrCourse.push(Number(i.MaKhoaHoc));
      }
      setDataUser(arrCourse);
    }
  }, [khoaHocHocVien, loginStatus]);
  
  useEffect(() =>{
    if(loginStatus && gioHang){
      
      const gioHangUser = gioHang.filter((item) =>{
        return Number(item.MaHocVien) === loginStatus.MaHocVien;
      })
      let tempDataCart = [];
      for(let i of gioHangUser){
        let [temp] = khoaHoc.filter((item) =>{
          return Number(item.MaKhoaHoc) === Number(i.MaKhoaHoc);
        }) 
        tempDataCart.push(temp);
      }
      setDataCart(tempDataCart);
    }
  }, [loginStatus, gioHang, khoaHoc]);

  const contextData = {
    khoaHoc,
    giaoVien,
    tenGiaoVien,
    baiGiang,
    setHocVien,
    hocVien,
    setLoginStatus,
    loginStatus,
    khoaHocHocVien,
    setKhoaHocHocVien,
    dataUser,
    setDataUser,
    fetchComment,
    setFetchComment,
    setDataSearch,
    dataSearch,
    dataCart,
    setDataCart,
    setGioHang,
    gioHang,
    activePage, 
    setActivePage, 
    offset, 
    setOffset, 
    test, 
    setTest,  
  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
};

export default ContextProvider;
