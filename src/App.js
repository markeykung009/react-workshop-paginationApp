import { useEffect, useState } from "react";
import FoodComponent from "./components/FoodComponent";
import MenuData from "./data/MenuData";
import "./App.css";

function App() {
  const [foodData, setFoodData] = useState(MenuData);
  const [dataInPage, setDataInPage] = useState([]);
  const [page, setPage] = useState(0);

  // ข้อมูลทั้งหมด 10 รายการ
  // จำนวนรายการแต่บะหน้า
  // จำนวนเลขหน้า = ข้อมูลทั้งหมด / จำนวนรายการแต่ละหน้า

  // 10 รายการ 10/3 = 4
  // 1 = [1-3] , 2 = [4-6] , 3 = [7-9] , 4 [10]

  const pagination = () => {
    const foodPerPage = 3; //ให้เสดงรายการอาการ 3 รายการต่อ 1 หน้า

    const pages = Math.ceil(MenuData.length / foodPerPage);
    console.log("จำนวนเลขหน้า = ", pages);

    const newFood = Array.from({ length: pages }, (el, idx) => {
      const start = idx * foodPerPage;
      return MenuData.slice(start, start + foodPerPage);
    });
    return newFood;
  };

  const handlePage = index => {
    setPage(index);
  };

  useEffect(() => {
    const paginate = pagination();
    setDataInPage(paginate);
    console.log(paginate[0]);
    setFoodData(paginate[page]);
  }, [page]);

  return (
    <div className="App">
      <h1>FoodCard | Pagination</h1>
      <div className="container">
        {foodData.map((el, idx) => {
          return <FoodComponent key={idx} food={el} />;
        })}
      </div>
      <div className="pagination-container">
        {dataInPage.map((el, idx) => {
          return (
            <button
              key={idx}
              className={`page-btn ${idx === page ? "active" : null}`}
              onClick={() => handlePage(idx)}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
