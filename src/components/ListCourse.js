import ListCourseItem from "./ListCourseItem";

function ListCourse(){
    return (
        <div className="listcourse__container">
            <ul>
                <ListCourseItem content="Lớp 1 - Lớp 2 - Lớp 3 - Lớp 4 - Lớp 5" 
                listcourse={{
                "lớp 1": "/khoahoc/cap1/lop1",
                "lớp 2": "/khoahoc/cap1/lop2",
                "lớp 3": "/khoahoc/cap1/lop3",
                "lớp 4": "/khoahoc/cap1/lop4",
                "lớp 5": "/khoahoc/cap1/lop5",
            }}/>
                <ListCourseItem content="Luyện thi lớp 6"
                listcourse={{
                "Tiếng Việt": "/khoahoc/luyen-thi-lop6/tieng-viet",
                "Toán": "/khoahoc/luyen-thi-lop6",
                "Tiếng Anh": "/khoahoc/luyen-thi-lop6/tieng-anh",
            }}/>
                <ListCourseItem content="Khóa học dành cho học sinh cấp 2"
                listcourse={{
                "lớp 6": "/khoahoc/cap2/lop6",
                "lớp 7": "/khoahoc/cap2/lop7",
                "lớp 8": "/khoahoc/cap2/lop8",
                "lớp 9": "/khoahoc/cap2/lop9",
            }}/>
                <ListCourseItem content="Luyện thi lớp 10"
                listcourse={{
                    "Ngữ Văn": "/khoahoc/luyen-thi-lop10/ngu-van",
                    "Toán": "/khoahoc/luyen-thi-lop10/toan",
                    "Tiếng Anh": "/khoahoc/luyen-thi-lop10/tieng-anh",
                }}/>
                <ListCourseItem content="Khóa học dành cho học sinh cấp 3"
                listcourse={{
                    "lớp 10": "/khoahoc/cap3/lop10",
                    "lớp 11": "/khoahoc/cap3/lop11",
                    "lớp 12": "/khoahoc/cap3/lop12",
                }}/>
                <ListCourseItem content="Luyện thi đại học"
                listcourse={{
                   "Ngữ Văn": "/khoahoc/luyen-thi-daihoc/ngu-van",
                    "Toán": "/khoahoc/luyen-thi-daihoc/toan",
                    "Tiếng Anh": "/khoahoc/luyen-thi-daihoc/tieng-anh",
                    "Vật Lý": "/khoahoc/luyen-thi-daihoc/vat-ly",
                    "Hóa Học": "/khoahoc/luyen-thi-daihoc/hoa-hoc",
                    "Sinh Học": "/khoahoc/luyen-thi-daihoc/sinh-hoc",
                   "Khoa Học Xã Hội": "/khoahoc/luyen-thi-daihoc/khoa-hoc-xa-hoi",
                }}/>
                <ListCourseItem content="Khóa học dành cho sinh viên"
                listcourse={{
                    "Toán Cao Cấp": "/khoahoc/daihoc/toan-cao-cap",
                     "Toeic": "/khoahoc/daihoc/toeic",
                 }}/>
            </ul>
        </div>
    )
}

export default ListCourse;