import "./home.css"
import { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion, AnimatePresence, color } from "framer-motion";
import { img } from "framer-motion/client";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Head_items = [
  { icon: "../img/Home-icon.svg" , ActiveIcon: "../img/Home-Active.svg" , name: "Home" },
  { icon: "../img/coins.svg", ActiveIcon: "../img/Coins-active.svg" , name: "Coins" },
  { icon: "../img/Statistics-icon.svg", ActiveIcon: "../img/Statistics-ActiveIcon.svg" , name: "Statistics" },
  { icon: "../img/setting-icon.svg", ActiveIcon: "../img/setting-Activeicon.svg" , name: "Setting" },
];

const transactionsData = [
  { img: '../img/transfer.svg', title: 'Money Transfer', category: 'Transfer', amount:+200.56, IsWithdraw: false, date: '2025-05-04'},
  { img: '../img/Apple.svg', title: 'Book Purchase', category: 'Education', amount: -28.50, IsWithdraw: true, date: '2025-05-09' },
  { img: '../img/spotify.svg', title: 'Utility Bill', category: 'Bills', amount: -15.98, IsWithdraw: true, date: '2025-05-12' },
  { img: '../img/transfer.svg', title: 'Money Transfer', category: 'Transfer', amount: 4.56, IsWithdraw: false, date: '2025-05-15' },
  { img: '../img/Apple.svg', title: 'Book Purchase', category: 'Education', amount: -28.50, IsWithdraw: true, date: '2025-05-18' },
  { img: '../img/spotify.svg', title: 'Utility Bill', category: 'Bills', amount: -15.98, IsWithdraw: true, date: '2025-05-21' },
  { img: '../img/transfer.svg', title: 'Money Transfer', category: 'Transfer', amount:+100.56, IsWithdraw: false, date: '2025-05-24' },
  { img: '../img/Apple.svg', title: 'Book Purchase', category: 'Education', amount: -28.50, IsWithdraw: true, date: '2025-05-27' },
  { img: '../img/spotify.svg', title: 'Utility Bill', category: 'Bills', amount: -15.98, IsWithdraw: true, date: '2025-05-30' },
  { img: '../img/transfer.svg', title: 'Money Transfer', category: 'Transfer', amount: 4.56, IsWithdraw: false, date: '2025-06-02' },
    ];

   


function Statistics() {
  const [option, setOption] = useState("month")
  const [showMenu, setshowMenu] = useState(true)
  const [showMenuList, setshowMenuList] = useState(true)
 
  const filteredData = () => {
    const now = new Date();

    return transactionsData.filter((t) => {
      const date = new Date(t.date);
      if(option === "Date") {
        // One day recent: check if the transaction is within the last 24 hours
        const diff = now - date;
        return diff >= 0 && diff <= 24 * 60 * 60 * 1000;
      }
      if(option === "Month") {
        // One month recent: same month and year
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }
      if(option === "Year") {
        // One year recent: same year
        return date.getFullYear() === now.getFullYear();
      }
      // "All" or default: show all
      return true;
    });
  };


 
    let balance = 0;
    const balances = filteredData().map(t => {
    const amount = t.IsWithdraw ? -Math.abs(t.amount) : t.amount;
    
    return balance += amount;
    });

    
const chartData = {
  labels: filteredData().map(t => t.date),
  datasets: [
    {
      label: 'Balance',
      data: balances,
      fill: false,
      borderColor: '#2D60FF',
      backgroundColor: '#2D60FF',
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#2D60FF',
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      display: true,
      title: {
        display: false,
      },
      grid: {
        color: '#f0f0f0',
      },
      beginAtZero: true,
    },
  },
};



  return (
    <div onClick={(e) => {setshowMenu(true);setshowMenuList(true);}} className="Statistics">

      <div  className="statistics_head">
        <Button  img={"../img/Backbtnsvg.svg"} />
        <div className="statistics_title">
          <p >Statistics</p>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="Statistics_Menu">
          <Button onClick={(e) => {setshowMenu(!showMenu);e.stopPropagation(); }} img={`../img/BurgerMenu.svg`} classname={`Statistics_icon `} />

          <div className={`Statistics_Menu_items ${showMenu ? "display" : ""}`}>
            <div className="Menu-item">
              <div onClick={() => setshowMenuList(!showMenuList)} className="Menu-item-head">
                <i className="fa-solid fa-filter"></i> Sort By <i className="fa-solid fa-sort-down"></i>
              </div>
              <ul className={showMenuList ? "display" : ""}>
                <li value={"All"} onClick={() => setOption("All")} className="menu_list">All</li>
                <li value={"Date"} onClick={() => setOption("Date")} className="menu_list">Date</li>
                <li onClick={() => setOption("Month")} className="menu_list">Month</li>
                <li onClick={() => setOption("Year")} className="menu_list">Year</li>
              </ul>
            </div>

            <div className="Menu-item">
              <div className="Menu-item-head">
                <img src="../img/Bell, Notification.svg" alt="" /> Notification
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <div className="current_Balance">
        <span>Current Balance</span>
        <p>${balances.length > 0 ? balances[balances.length - 1].toFixed(2) : "0.00"}</p>
      </div>

      <div className="Statistics_Balance">
        <div className="chart-wrapper" style={{ height: 300 }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      <Transaction transactions={filteredData()} />
    </div>
  );
}


function HomePage({ name, card }) {


  const cardArray = Array.isArray(card) ? card : card ? [card] : [];

  return (
    <>
    <div className="HomePage">
      <div className="Home_head">
        <div className="Home_head-details">
          <span>welcome back,</span>
          <p>{name}</p>
        </div>
        <div className="searchIcon">
          <img src="/img/searchIcon.svg" alt="Search" />
        </div>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        className="swiper-Parent"
      >

        {cardArray.map((item, index) => {
          const cardHolder = item.name;
          const cardNumber = item.number;
          const cardValid = item.expiry;
          const seccode = item.cvv;

          return ( 
            <SwiperSlide key={index}>
              <GetCard 
                cardHolder={cardHolder} 
                cardNumber={cardNumber} 
                cardValid={cardValid} 
                seccode={seccode} 
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="categories">
        <Categories img={"../img/send.svg"} name={"send"} />
        <Categories img={"../img/get.svg"} name={"Receive"} />
        <Categories img={"../img/mony.svg"} name={"Loan"} />
        <Categories img={"../img/Topup.svg"} name={"Topup"} />
      </div>

      <div className="Transactions">
      <div className="Transaction_head">
        <p>Transaction</p> <span>See All </span>
      </div>

      <Transaction  transactions={transactionsData.filter((item,idx)=>(
  idx < 3 ? item  : ""
))}/>

    </div>
    <div className="on_head"></div>
    
    </div>
    </>
  );
}

 
function GetCard({cardHolder,cardNumber,cardValid,seccode}) {

  return (
    <>

         
          <div className="card">
            <div className="card-inner">
              <div className="card-front">
                <div
                  className="card-bg"
                  style={{backgroundImage : `url("/img/Card_svg.svg")` }}
                ></div>
                <div className="card-glow"></div>
                <svg
                  width="72"
                  height="24"
                  viewBox="0 0 72 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="logo"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M52.3973 1.01093L51.5588 5.99054C49.0448 4.56717 43.3231 4.23041 43.3231 6.85138C43.3231 7.89285 44.6177 8.60913 46.178 9.47241C48.5444 10.7817 51.5221 12.4291 51.5221 16.062C51.5221 21.8665 45.4731 24 41.4645 24C37.4558 24 34.8325 22.6901 34.8325 22.6901L35.7065 17.4848C38.1115 19.4688 45.4001 20.032 45.4001 16.8863C45.4001 15.5645 43.9656 14.785 42.3019 13.8811C40.0061 12.6336 37.2742 11.1491 37.2742 7.67563C37.2742 1.30988 44.1978 0 47.1132 0C49.8102 0 52.3973 1.01093 52.3973 1.01093ZM66.6055 23.6006H72L67.2966 0.414276H62.5732C60.3923 0.414276 59.8612 2.14215 59.8612 2.14215L51.0996 23.6006H57.2234L58.4481 20.1566H65.9167L66.6055 23.6006ZM60.1406 15.399L63.2275 6.72235L64.9642 15.399H60.1406ZM14.7942 16.3622L20.3951 0.414917H26.7181L17.371 23.6012H11.2498L6.14551 3.45825C2.83215 1.41281 0 0.807495 0 0.807495L0.108643 0.414917H9.36816C11.9161 0.414917 12.1552 2.50314 12.1552 2.50314L14.1313 12.9281L14.132 12.9294L14.7942 16.3622ZM25.3376 23.6006H31.2126L34.8851 0.414917H29.0095L25.3376 23.6006Z"
                    fill="white"
                  />
                </svg>
                <div className="card-contactless">
                  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56">
                    <path
                      fill="none"
                      stroke="#f9f9f9"
                      strokeWidth="6"
                      strokeLinecap="round"
                      d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5 0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
                    />
                  </svg>
                </div>
                <div className="card-chip"></div>
                <div className="card-holder">{cardHolder}</div>
                <div className="card-number">{cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4")}</div>
                <div className="card-valid">{cardValid}</div>
              </div>
              <div className="card-back">
                <div className="card-signature">{cardHolder}</div>
                <div className="card-seccode">{seccode}</div>
              </div>
            </div>
          </div>
 
 
    </>
  );
}

function Categories({img,name}){
  return(
          
        <button className="category_item">

          <div className="ct_item">
            <img src={img} alt="" />
          </div>

          <span>{name}</span>

        </button>
     
  )
}

function Transaction({ transactions = [] }) {
  return (

      <div className="Transaction_items">
        {transactions.map((item, idx) => (
          <div className="T_item" key={idx}>
            <div className="T_item-img">
              <img src={item.img} alt="" />
            </div>
            <div className="T_item-title">
              <p>{item.title}</p>
              <span>{item.category}</span>
            </div>
            <div className="T_amount">
              <p className={`${item.IsWithdraw ? "red" : "greeen"}`}>{item.amount}</p>
            </div>
          </div>
        ))}
      </div>
    
  );
}

function Button({img, classname, onClick}){
  return(
        <div onClick={onClick} className={`default_style_btn ${classname}`}>
          <img src={img}  alt=""/>
        </div>
  )
}


function Head_bottom({ Head_items = [],active,setActive }) {
 
  return (
    <div className="H_bottom">
      {Head_items.map((item, idx) => (
        <div
          className={`H_item${active === item.name ? " active" : ""}`}
          key={idx}
          onClick={() => setActive(item.name)}
        >
          <img
            src={active === item.name ? item.ActiveIcon : item.icon}
            alt={item.name || "Icon"}
          />
          <span style={{ color: active === item.name ? "#2D60FF" : "#54646C" }}>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function HomeComponent({
  name,
  card
}){
 const [active,setActive] = useState("Statistics")
    return(
      <>

      {active === "Home" && (
        <HomePage 
        name={name}
        card={card}
      />
      )}

    {active === "Statistics" && (
        <Statistics
  
      />
      )}

       <Head_bottom active={active} setActive={setActive} Head_items={Head_items}/>
      </>

    )

}