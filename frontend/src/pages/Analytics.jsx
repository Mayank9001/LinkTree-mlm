import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./styles/Analytics.module.css";
import Spark from "../assets/Spark.png";
import Boy from "../assets/Boy.png";
import { userDetails } from "../services/user.services";
import useIsMobile from "../components/hooks/useIsMobile";
import { getAnalytics } from "../services/profile.services";
import { GoDotFill } from "react-icons/go";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar, Rectangle } from "recharts";
import { PieChart, Pie, Sector, Cell } from "recharts";

const Analytics = () => {
  const isMobile = useIsMobile();
  const [name, setName] = useState("");
  const [logoutVisbile, setLogoutVisible] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [appData, setAppData] = useState([]);
  const [selectedClickBox, setSelectedClickBox] = useState("COL");
  const [linksData, setLinksData] = useState([]);
  const [cta, setCta] = useState(0);
  const [cos, setCos] = useState(0);
  const [col, setCol] = useState(0);
  const colors = [
    "#92FFC6",
    "#9BEBC1",
    "#165534",
    "#3EE58F",
    "#A1D4BA",
    "#21AF66",
  ];
  const active = {
    isLinks: false,
    isAppearance: false,
    isAnalytics: true,
    isSettings: false,
  };
  const analytics = async () => {
    const res = await getAnalytics();
    const data = await res.json();
    if (res.status === 200) {
      setMonthlyData(data.monthlyData);
      setDeviceData(data.defaultTrafficData);
      setAppData(data.clickData);
      setLinksData(data.trafficbylinks);
      setCta(data.cta || 0);
      setCol(data.appClicks || 0);
      setCos(data.shopClicks || 0);
    }
  };
  const getDetails = async () => {
    const res = await userDetails();
    const data = await res.json();
    if (res.status === 200) {
      setName(
        data.user.userDetails.firstName + " " + data.user.userDetails.lastName
      );
    }
  };
  useEffect(() => {
    getDetails();
  }, []);
  useEffect(() => {
    analytics();
  }, []);
  return (
    <>
      <Navbar active={active} />
      <div className={styles.container}>
        <div
          className={styles.header}
          style={{ display: !isMobile ? "none" : "" }}
        >
          <img src={Spark} className={styles.logo} alt="logo" />
          <img
            src={Boy}
            alt="profile"
            className={styles.pic}
            onClick={() => setLogoutVisible((prev) => !prev)}
          />
          <div className={styles.logout}>
            {logoutVisbile && (
              <button
                style={{ visibility: logoutVisbile ? "visible" : "hidden" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="1">
                    <path
                      d="M20.9678 18.4478C20.9581 18.7929 20.8791 19.1326 20.7356 19.4467C20.5921 19.7607 20.3869 20.0427 20.1322 20.2759C19.8776 20.5091 19.5787 20.6887 19.2532 20.8041C18.9278 20.9196 18.5825 20.9684 18.2378 20.9478C16.0848 20.9598 13.9318 20.9478 11.7788 20.9478C11.6462 20.9478 11.519 20.8951 11.4253 20.8013C11.3315 20.7076 11.2788 20.5804 11.2788 20.4478C11.2788 20.3152 11.3315 20.188 11.4253 20.0942C11.519 20.0004 11.6462 19.9478 11.7788 19.9478C13.9788 19.9478 16.1788 19.9798 18.3788 19.9478C19.4858 19.9318 19.9678 19.0998 19.9678 18.1098V5.64677C19.975 5.33215 19.8862 5.02281 19.7133 4.75987C19.5404 4.49693 19.2915 4.29285 18.9998 4.17477C18.6546 4.08006 18.2953 4.04789 17.9388 4.07977H11.7788C11.6462 4.07977 11.519 4.02709 11.4253 3.93332C11.3315 3.83956 11.2788 3.71238 11.2788 3.57977C11.2788 3.44716 11.3315 3.31998 11.4253 3.22622C11.519 3.13245 11.6462 3.07977 11.7788 3.07977C14.0028 3.07977 16.2438 2.99477 18.4658 3.07977C18.8061 3.08838 19.1412 3.16457 19.4518 3.30391C19.7623 3.44326 20.0421 3.64298 20.2747 3.89144C20.5074 4.13991 20.6883 4.43216 20.8069 4.75119C20.9256 5.07022 20.9796 5.40967 20.9658 5.74977L20.9678 18.4478Z"
                      fill="black"
                    />
                    <path
                      d="M3.17617 11.6629C3.09212 11.7451 3.04274 11.8564 3.03817 11.9739C3.03951 11.9879 3.03751 12.0022 3.03217 12.0169C3.02417 12.0389 3.03217 12.0439 3.03817 12.0579C3.04248 12.1757 3.09188 12.2874 3.17617 12.3699L6.84517 16.0389C6.93948 16.13 7.06578 16.1804 7.19688 16.1792C7.32797 16.1781 7.45338 16.1255 7.54608 16.0328C7.63879 15.9401 7.69137 15.8147 7.69251 15.6836C7.69365 15.5525 7.64325 15.4262 7.55217 15.3319L4.73717 12.5159H15.4792C15.6118 12.5159 15.739 12.4632 15.8327 12.3694C15.9265 12.2757 15.9792 12.1485 15.9792 12.0159C15.9792 11.8833 15.9265 11.7561 15.8327 11.6623C15.739 11.5686 15.6118 11.5159 15.4792 11.5159H4.73717L7.55217 8.69989C7.64325 8.60559 7.69365 8.47929 7.69251 8.34819C7.69137 8.2171 7.63879 8.09169 7.54608 7.99899C7.45338 7.90628 7.32797 7.8537 7.19688 7.85256C7.06578 7.85142 6.93948 7.90182 6.84517 7.99289L3.17617 11.6629Z"
                      fill="black"
                    />
                  </g>
                </svg>
                Sign out
              </button>
            )}
          </div>
        </div>
        <div
          className={styles.deskHeader}
          style={{ display: isMobile ? "none" : "" }}
        >
          <div>
            Hi, <span>{name}</span>!
          </div>
          <h5>Congratulations . You got a great response today . </h5>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>Overview</div>
          <div className={styles.clicksData}>
            <div
              className={
                selectedClickBox === "COL"
                  ? styles.selected
                  : styles.clicksboxes
              }
              onClick={() => setSelectedClickBox("COL")}
            >
              <h5>Clicks on Links</h5>
              <span>{col}</span>
            </div>
            <div
              className={
                selectedClickBox === "COS"
                  ? styles.selected
                  : styles.clicksboxes
              }
              onClick={() => setSelectedClickBox("COS")}
            >
              <h5>Clicks on Shop</h5>
              <span>{cos}</span>
            </div>
            <div
              className={
                selectedClickBox === "CTA"
                  ? styles.selected
                  : styles.clicksboxes
              }
              onClick={() => setSelectedClickBox("CTA")}
            >
              <h5>CTA</h5>
              <span>{cta}</span>
            </div>
          </div>
          <div className={styles.monthlychart}>
            {monthlyData?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{ top: 40, right: 30, left: 0, bottom: 10 }}
                >
                  <XAxis
                    dataKey="month"
                    stroke="#8884d8"
                    axisLine={false}
                    tickLine={false}
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#00000080"
                    strokeWidth={1}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className={styles.title}>No data available</div>
            )}
          </div>
          <div className={styles.deviceandapp}>
            <div className={styles.devicechart}>
              <div className={styles.devicetitle}>Traffic by Device</div>
              {deviceData?.length ? (
                <ResponsiveContainer
                  width={!isMobile ? "100%" : "90%"}
                  height={!isMobile ? "90%" : "80%"}
                >
                  <BarChart
                    width={!isMobile ? 500 : 300}
                    height={!isMobile ? 300 : 160}
                    data={deviceData}
                    margin={
                      !isMobile
                        ? {
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20,
                          }
                        : { left: 0, right: 0, top: 0, bottom: 0 }
                    }
                  >
                    <XAxis
                      dataKey="device"
                      axisLine={false}
                      tickLine={false}
                      padding={!isMobile ? 10 : 0}
                      tick={{ fontSize: !isMobile ? 20 : 12 }}
                      interval={0}
                    />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar
                      dataKey="clicks"
                      radius={!isMobile ? 12 : 6}
                      scale="band"
                    >
                      {deviceData?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className={styles.title}>No data available</div>
              )}
            </div>
            <div className={styles.appchart}>
              <div className={styles.pies}>
                <div className={styles.piestitle}>Sites</div>
                {appData?.length ? (
                  <ResponsiveContainer
                    width="100%"
                    height={!isMobile ? "86%" : "80%"}
                  >
                    <PieChart>
                      <Pie
                        data={appData}
                        dataKey="clicks"
                        nameKey="appType"
                        cx="50%"
                        cy="50%"
                        innerRadius={!isMobile ? 60 : 35}
                        outerRadius={!isMobile ? 100 : 60}
                        label
                        paddingAngle={5}
                        cornerRadius={!isMobile ? 12 : 8}
                      >
                        {appData?.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className={styles.title}>No data available</div>
                )}
              </div>
              <div className={styles.piesdesc}>
                {appData?.map((data, index) => (
                  <div key={index} className={styles.piesdescdata}>
                    <GoDotFill
                      color={colors[index % colors.length]}
                      size={24}
                      style={{ marginLeft: "1rem", marginRight: "1rem" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <span>{data.app}</span>
                      <span>{data.clicks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.linkChart}>
            <div className={styles.linktitle}>Traffic by Links</div>
            {linksData?.length ? (
              <ResponsiveContainer
                width={!isMobile ? "100%" : "90%"}
                height={!isMobile ? "90%" : "80%"}
              >
                <BarChart
                  width={500}
                  height={300}
                  data={linksData}
                  margin={
                    !isMobile
                      ? {
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 20,
                        }
                      : { left: 0, right: 0, top: 0, bottom: 0 }
                  }
                  padding={0}
                >
                  <XAxis
                    dataKey="title"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: !isMobile ? 20 : 9 }}
                    interval={0}
                    padding={!isMobile ? 10 : 0}
                  />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="clicks" radius={!isMobile ? 12 : 8}>
                    {deviceData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className={styles.title}>No data available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
