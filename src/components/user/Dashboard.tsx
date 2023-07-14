import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js/auto";
import SecondaryButton from "../UI/SecondaryButton";
import { gql, useQuery } from "@apollo/client";
import { useAppSelector } from "@/store";

ChartJS.register(CategoryScale);

const QUERY_SOLD_DATE = gql`
  {
    getSoldDate
  }
`;

export default function Dashboard() {
  const [dateString, setDateString] = useState("year");
  const auth = useAppSelector((state) => state.auth);
  const [dateYears, setDateYears] = useState([]);
  const [dateMonths, setDateMonths] = useState([]);
  const [dateDays, setDateDays] = useState([]);
  const { loading, data, error } = useQuery(QUERY_SOLD_DATE, {
    context: {
      headers: {
        authorization: `bearer ${auth.token}`,
      },
    },
  });
  useEffect(() => {
    if (data) {
      const decryptedData = JSON.parse(data.getSoldDate);
      console.log(decryptedData);
      setDateDays(decryptedData.dateDays);
      setDateMonths(decryptedData.dateMonths);
      setDateYears(decryptedData.dateYears);
      setDateString("year");
      setDateFormat(decryptedData.dateYears);
    }
  }, [data]);
  const [dateFormat, setDateFormat]: any[] = useState(dateYears);
  function changeDateFormat(date: number) {
    if (date == 0) {
      setDateString("year");
      setDateFormat(dateYears);
    } else if (date == 1) {
      setDateString("months");
      setDateFormat(dateMonths);
    } else if (date == 2) {
      setDateString("days");
      setDateFormat(dateDays);
    }
  }
  console.log(dateFormat);
  return (
    <div className="">
      <div>
        <h1>Total Sales:</h1>
        <div className="flex gap-3">
          <SecondaryButton onClick={changeDateFormat.bind(null, 0)}>
            Years
          </SecondaryButton>
          <SecondaryButton onClick={changeDateFormat.bind(null, 1)}>
            Months
          </SecondaryButton>
          <SecondaryButton onClick={changeDateFormat.bind(null, 2)}>
            Days
          </SecondaryButton>
        </div>
        <div className="w-[600px]">
          <Bar
            data={{
              labels: dateFormat.map(
                (data: any) => data.year || data.month || data.day
              ),
              datasets: [
                {
                  label: `Products had sold in this ${dateString}`,
                  data: dateFormat.map((data: any) => data.solds),
                  borderColor: "black",
                  borderWidth: 1,
                  backgroundColor: "#f20f91",
                  //   pointHitRadius: 5,
                },
              ],
            }}
            options={{}}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
