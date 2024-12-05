import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import parliamentChart from "./parliament-chart";

const data = {
  ELECTION: {
    "@YEAR": "2024",
    "@TITLE": "National Summary",
    "@GENERATED": "2024-12-03 10:49:23Z",
    "@TYPE": "Irish General Election",
    "@TYPE_ID": "1",
    SUMMARY: {
      PARTY_GROUPS: {
        GROUP: [
          {
            "@ID": "G13",
            GROUP_NAME: "FF",
            FIRST_PREFERENCE_VOTES: "481,414",
            SHARE_OF_THE_VOTE: "21.9",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "48",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "484,315",
              SHARE_OF_THE_VOTE: "22.2",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "-0.3",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G14",
            GROUP_NAME: "SF",
            FIRST_PREFERENCE_VOTES: "418,627",
            SHARE_OF_THE_VOTE: "19.0",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "39",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "535,392",
              SHARE_OF_THE_VOTE: "24.5",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "-5.5",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G15",
            GROUP_NAME: "FG",
            FIRST_PREFERENCE_VOTES: "458,134",
            SHARE_OF_THE_VOTE: "20.8",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "38",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "455,749",
              SHARE_OF_THE_VOTE: "20.9",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "-0.1",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G16",
            GROUP_NAME: "GP",
            FIRST_PREFERENCE_VOTES: "66,911",
            SHARE_OF_THE_VOTE: "3.0",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "1",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "155,695",
              SHARE_OF_THE_VOTE: "7.1",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "-4.1",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G17",
            GROUP_NAME: "LAB",
            FIRST_PREFERENCE_VOTES: "102,457",
            SHARE_OF_THE_VOTE: "4.7",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "11",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "95,582",
              SHARE_OF_THE_VOTE: "4.4",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "+0.3",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G18",
            GROUP_NAME: "SD",
            FIRST_PREFERENCE_VOTES: "106,028",
            SHARE_OF_THE_VOTE: "4.8",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "11",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "63,397",
              SHARE_OF_THE_VOTE: "2.9",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "+1.9",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G19",
            GROUP_NAME: "PBP-SOL",
            FIRST_PREFERENCE_VOTES: "62,481",
            SHARE_OF_THE_VOTE: "2.8",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "3",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "57,420",
              SHARE_OF_THE_VOTE: "2.6",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "+0.2",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G20",
            GROUP_NAME: "AON",
            FIRST_PREFERENCE_VOTES: "86,134",
            SHARE_OF_THE_VOTE: "3.9",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "2",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "41,575",
              SHARE_OF_THE_VOTE: "1.9",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "+2.0",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G21",
            GROUP_NAME: "II",
            FIRST_PREFERENCE_VOTES: "78,276",
            SHARE_OF_THE_VOTE: "3.6",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "4",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "0",
              SHARE_OF_THE_VOTE: "0.0",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "+3.6",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G22",
            GROUP_NAME: "IND",
            FIRST_PREFERENCE_VOTES: "290,748",
            SHARE_OF_THE_VOTE: "13.2",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "8",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "266,353",
              SHARE_OF_THE_VOTE: "12.2",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "+1.0",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G22",
            GROUP_NAME: "RGI",
            FIRST_PREFERENCE_VOTES: "290,748",
            SHARE_OF_THE_VOTE: "13.2",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "8",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "266,353",
              SHARE_OF_THE_VOTE: "12.2",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "+1.0",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "G23",
            GROUP_NAME: "100%RDR",
            FIRST_PREFERENCE_VOTES: "51,243",
            SHARE_OF_THE_VOTE: "2.3",
            SHOW_ON_GRAPHIC: "Y",
            SEATS_WON: "1",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "28,011",
              SHARE_OF_THE_VOTE: "1.3",
              SHOW_ON_GRAPHIC: "Y",
              CHANGE: "+1.0",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              SHOW_ON_GRAPHIC: "N",
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
        ],
      },
      SWINGS: {
        COMPARISON_1: {
          COMPARISON_WITH: null,
          SWING_1: {
            SWING_DESCRIPTION: null,
            SWING_VALUE: null,
          },
          SWING_2: {
            SWING_DESCRIPTION: null,
            SWING_VALUE: null,
          },
        },
        COMPARISON_2: {
          COMPARISON_WITH: null,
          SWING_1: {
            SWING_DESCRIPTION: null,
            SWING_VALUE: null,
          },
          SWING_2: {
            SWING_DESCRIPTION: null,
            SWING_VALUE: null,
          },
        },
      },
      MINOR_PARTIES: {
        PARTY: [
          {
            "@ID": "P11",
            PARTY_MNEMONIC: "NP",
            PARTY_NAME: "National Party",
            FIRST_PREFERENCE_VOTES: "6,511",
            SHARE_OF_THE_VOTE: "0.3",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "4,773",
              SHARE_OF_THE_VOTE: "0.2",
              CHANGE: "+0.1",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P12",
            PARTY_MNEMONIC: "I4C",
            PARTY_NAME: "Independents 4 Change",
            FIRST_PREFERENCE_VOTES: "5,166",
            SHARE_OF_THE_VOTE: "0.2",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "8,421",
              SHARE_OF_THE_VOTE: "0.4",
              CHANGE: "-0.2",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P13",
            PARTY_MNEMONIC: "IFP",
            PARTY_NAME: "Irish Freedom Party",
            FIRST_PREFERENCE_VOTES: "14,838",
            SHARE_OF_THE_VOTE: "0.7",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "5,495",
              SHARE_OF_THE_VOTE: "0.3",
              CHANGE: "+0.4",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P14",
            PARTY_MNEMONIC: "IP",
            PARTY_NAME: "Irish People",
            FIRST_PREFERENCE_VOTES: "7,626",
            SHARE_OF_THE_VOTE: "0.3",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "0",
              SHARE_OF_THE_VOTE: "0.0",
              CHANGE: "+0.3",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P15",
            PARTY_MNEMONIC: "IF",
            PARTY_NAME: "Ireland First",
            FIRST_PREFERENCE_VOTES: "3,339",
            SHARE_OF_THE_VOTE: "0.2",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "0",
              SHARE_OF_THE_VOTE: "0.0",
              CHANGE: "+0.2",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P16",
            PARTY_MNEMONIC: "RTC",
            PARTY_NAME: "Right to Change",
            FIRST_PREFERENCE_VOTES: "2,907",
            SHARE_OF_THE_VOTE: "0.1",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "0",
              SHARE_OF_THE_VOTE: "0.0",
              CHANGE: "+0.1",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P17",
            PARTY_MNEMONIC: "100%RDR",
            PARTY_NAME: "100% Redress",
            FIRST_PREFERENCE_VOTES: "6,862",
            SHARE_OF_THE_VOTE: "0.3",
            SEATS_WON: "1",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "0",
              SHARE_OF_THE_VOTE: "0.0",
              CHANGE: "+0.3",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P18",
            PARTY_MNEMONIC: "LR",
            PARTY_NAME: "Liberty Republic",
            FIRST_PREFERENCE_VOTES: "1,936",
            SHARE_OF_THE_VOTE: "0.1",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "0",
              SHARE_OF_THE_VOTE: "0.0",
              CHANGE: "+0.1",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P19",
            PARTY_MNEMONIC: "RAB",
            PARTY_NAME: "Rabharta",
            FIRST_PREFERENCE_VOTES: "626",
            SHARE_OF_THE_VOTE: "0.0",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "0",
              SHARE_OF_THE_VOTE: "0.0",
              CHANGE: "0.0",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P20",
            PARTY_MNEMONIC: "PAW",
            PARTY_NAME: "Party for Animal Welfare",
            FIRST_PREFERENCE_VOTES: "884",
            SHARE_OF_THE_VOTE: "0.0",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "0",
              SHARE_OF_THE_VOTE: "0.0",
              CHANGE: "0.0",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P21",
            PARTY_MNEMONIC: "CPI",
            PARTY_NAME: "Centre Party of Ireland",
            FIRST_PREFERENCE_VOTES: "548",
            SHARE_OF_THE_VOTE: "0.0",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "0",
              SHARE_OF_THE_VOTE: "0.0",
              CHANGE: "0.0",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
          {
            "@ID": "P22",
            PARTY_MNEMONIC: "MISC",
            PARTY_NAME: "Parties not Contesting 2024",
            FIRST_PREFERENCE_VOTES: "0",
            SHARE_OF_THE_VOTE: "0.0",
            SEATS_WON: "0",
            COMPARISON_1: {
              COMPARISON_WITH: "2020",
              FIRST_PREFERENCE_VOTES: "9,322",
              SHARE_OF_THE_VOTE: "0.4",
              CHANGE: "-0.4",
              SEATS_WON: "0",
            },
            COMPARISON_2: {
              COMPARISON_WITH: null,
              FIRST_PREFERENCE_VOTES: null,
              SHARE_OF_THE_VOTE: null,
              CHANGE: null,
              SEATS_WON: "0",
            },
          },
        ],
      },
    },
  },
};

const colors = {
  FF: "rgb(17, 164, 83)",
  SF: "rgb(13, 117, 114)",
  FG: "rgb(0, 164, 230)",
  LAB: "rgb(238, 58, 70)",
  SD: "rgb(118, 47, 138)",
  GP: "rgb(145, 185, 5)",
  AON: "rgb(70, 80, 185)",
  "PBP-SOL": "rgb(84, 0, 8)",
  IND: "rgb(251, 178, 23)",
  Renua: "#03a9f4",
  II: "rgb(188, 57, 184)",
  "100%RDR": "rgb(202, 58, 93)",
  RGI: "rgb(223, 119, 21)",
};

export default function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const [chartData, setChartData] = useState<
    { seats: number; color: string; partyName: string }[]
  >([]);
  const [sizeSortedChartData, setSizeSortedChartData] = useState<
    { seats: number; color: string; partyName: string }[]
  >([]);
  const [numOfIndependents, setNumOfIndependents] = useState(0);

  const [selectedParties, setSelectedParties] = useState<string[]>(
    queryParameters.get("parties")?.split(",") ?? []
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    d3.select("svg#pchart").selectAll("g").remove();
    d3.select("svg#pchart")
      .append("g")
      .call(
        parliamentChart()
          .width(window.innerWidth < 800 ? 350 : 900)
          .aggregatedData(chartData)
          .sections(1)
          .seatRadius(window.innerWidth < 800 ? 6 : 15)
          .rowHeight(window.innerWidth < 800 ? 14 : 40)
      );
  }, [chartData]);

  useEffect(() => {
    queryParameters.set("parties", selectedParties.join(","));
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${queryParameters}`
    );

    const numOfInds = parseInt(
      data.ELECTION.SUMMARY.PARTY_GROUPS.GROUP.find(
        (x) => x.GROUP_NAME === "IND"
      )?.SEATS_WON ?? "0"
    );
    const dataNoIndParty = data.ELECTION.SUMMARY.PARTY_GROUPS.GROUP.filter(
      (x) => x.GROUP_NAME !== "IND"
    );

    for (let i = 0; i < numOfInds; i++) {
      dataNoIndParty.push({
        "@ID": "",
        GROUP_NAME: "IND_" + i.toString(),
        FIRST_PREFERENCE_VOTES: "",
        SHARE_OF_THE_VOTE: "",
        SHOW_ON_GRAPHIC: "",
        SEATS_WON: "1",
        COMPARISON_1: {
          COMPARISON_WITH: "",
          FIRST_PREFERENCE_VOTES: "",
          SHARE_OF_THE_VOTE: "",
          SHOW_ON_GRAPHIC: "",
          CHANGE: "",
          SEATS_WON: "",
        },
        COMPARISON_2: {
          COMPARISON_WITH: null,
          FIRST_PREFERENCE_VOTES: null,
          SHARE_OF_THE_VOTE: null,
          SHOW_ON_GRAPHIC: "",
          CHANGE: null,
          SEATS_WON: "",
        },
      });
    }

    const unsortedFormattedData = dataNoIndParty.map((party) => {
      return {
        seats: parseInt(party.SEATS_WON),
        color: colors[party.GROUP_NAME.split("_")[0]],
        partyName: party.GROUP_NAME,
        selected: selectedParties.includes(party.GROUP_NAME),
      };
    });

    const unsortedSelectedParties = unsortedFormattedData.filter((party) =>
      selectedParties.includes(party.partyName)
    );
    const unsortedUnselectedParties = unsortedFormattedData.filter(
      (party) => !selectedParties.includes(party.partyName)
    );
    unsortedSelectedParties.sort((a, b) =>
      a.partyName == "RGI" ? 1 : b.seats - a.seats
    );
    unsortedUnselectedParties.sort((a, b) =>
      a.partyName == "RGI" ? 1 : b.seats - a.seats
    );
    const formattedData = unsortedSelectedParties.concat(
      unsortedUnselectedParties
    );
    setChartData(formattedData);
    const formattedDataCopy = JSON.parse(JSON.stringify(formattedData));
    formattedDataCopy.sort((a, b) => {
      if (b.seats === a.seats) {
        return a.partyName.localeCompare(b.partyName);
      }
      if (a.partyName == "RGI") return 1;
      if (b.partyName == "RGI") return -1;
      return b.seats - a.seats;
    });
    setSizeSortedChartData(formattedDataCopy);
  }, [selectedParties]);

  return (
    <div className="w-screen h-screen relative flex flex-col justify-center items-center md:pb-0 pb-[80px]">
      <div className="flex sm:w-1/2 sm:pt-0 pt-4 w-full px-4 sm:px-0 justify-between z-10">
        <button
          onClick={() => setShowModal(true)}
          className="text-3xl font-bold"
        >
          SHARE
        </button>
        <button
          onClick={() => {
            setChartData([]);
            setSelectedParties([]);
            setSizeSortedChartData([]);
            setNumOfIndependents(0);
          }}
          className="text-3xl font-bold"
        >
          RESET
        </button>
      </div>
      <svg className="h-[500px] md:pt-0 w-[350px] md:w-[900px]" id="pchart" />
      <div className="md:flex grid grid-cols-2 w-4/5 justify-center gap-2 sm:gap-4 z-10">
        {sizeSortedChartData
          .filter((party) => !party.partyName.includes("IND"))
          .map((party) => {
            const selected = selectedParties.includes(party.partyName);
            return (
              <div className="flex flex-col">
                <div
                  key={party.partyName}
                  onClick={() =>
                    setSelectedParties((prev) => {
                      if (prev.includes(party.partyName)) {
                        return prev.filter((p) => p !== party.partyName);
                      }
                      return [...prev, party.partyName];
                    })
                  }
                  className={`px-4 flex items-center justify-center select-none cursor-pointer md:text-lg sm:text-md text-sm py-2 rounded-lg text-white font-bold duration-200 ${selected ? "opacity-100" : "opacity-30"} md:hover:opacity-90`}
                  style={{ backgroundColor: party.color }}
                >
                  {party.partyName}
                </div>
              </div>
            );
          })}
        <div className="flex flex-col">
          <div
            key={"IND"}
            onClick={() => {
              if (
                numOfIndependents >=
                parseInt(
                  data.ELECTION.SUMMARY.PARTY_GROUPS.GROUP.find(
                    (x) => x.GROUP_NAME === "IND"
                  )?.SEATS_WON ?? "0"
                )
              ) {
                setNumOfIndependents(0);
                setSelectedParties(
                  selectedParties.filter((x) => !x.includes("IND"))
                );
              } else {
                setNumOfIndependents((prev) => prev + 1);
                setSelectedParties((prev) => [
                  ...prev,
                  "IND_" + numOfIndependents,
                ]);
              }
            }}
            className={`px-4 flex items-center justify-center select-none cursor-pointer md:text-lg sm:text-md text-sm py-2 rounded-t-lg text-white font-bold duration-200 ${numOfIndependents > 0 ? "opacity-100" : "opacity-30"} md:hover:opacity-90`}
            style={{ backgroundColor: colors["IND"] }}
          >
            IND
          </div>
          <p className="text-center bg-white shadow-md rounded-b-lg">
            {numOfIndependents}
          </p>
        </div>
      </div>
      <div className="absolute bg-transparent w-full h-full md:top-0 -top-[100px] bottom-0 right-0 left-0 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="md:text-[100px] text-5xl leading-none font-bold text-black pt-[20px] md:pt-[250px]">
            {chartData
              .filter((party) => selectedParties.includes(party.partyName))
              .reduce((p, c) => p + c.seats, 0)}
          </div>
          <p className="text-xl">
            {chartData
              .filter((party) => selectedParties.includes(party.partyName))
              .reduce((p, c) => p + c.seats, 0) > 87
              ? "Majority reached!"
              : "Need more seats..."}
          </p>
        </div>
      </div>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="absolute bg-transparent w-full h-full z-30 backdrop-blur-sm top-0 bottom-0 right-0 left-0 flex justify-center items-center"
        >
          <div className="w-[300px] z-40 p-6 bg-white rounded-2xl shadow-2xl flex flex-col gap-2">
            <h1 className="text-3xl font-bold pb-2">Share</h1>
            <a
              className="text-2xl font-bold"
              target="_blank"
              href={
                /Mobi/i.test(window.navigator.userAgent)
                  ? `bluesky://intent/compose/?text=${encodeURIComponent("Interesting government coalition 🤔<br/><br/>#GE24 #GE24CoalitionBuilder<br/><br/>" + `https://coalitionbuilder.ie/?${queryParameters}`)}`
                  : `https://bsky.app/intent/compose/?text=${encodeURIComponent("Interesting government coalition 🤔<br/><br/>#GE24 #GE24CoalitionBuilder<br/><br/>" + `https://coalitionbuilder.ie/?${queryParameters}`)}`
              }
            >
              <div className="flex cursor-pointer gap-2 justify-between items-center bg-white shadow-lg rounded-lg py-2 px-4 border-2">
                Bluesky
                <img className="w-[25px] h-[25px]" src="bluesky.png" />
              </div>
            </a>
            <a
              target="_blank"
              href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent("Interesting government coalition 🤔\n#GE24 #GE24CoalitionBuilder\n\n")}&url=https://coalitionbuilder.ie/?${queryParameters}`}
              className="text-2xl font-bold"
            >
              <div className="flex cursor-pointer gap-2 justify-between items-center bg-white shadow-lg rounded-lg py-2 px-4 border-2">
                Twitter
                <img className="w-[25px] h-[25px]" src="twitter.png" />
              </div>
            </a>
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://coalitionbuilder.ie/?${queryParameters}`
                );
              }}
              className="flex cursor-pointer gap-2 justify-between items-center bg-white shadow-lg rounded-lg py-2 px-4 border-2"
            >
              <a className="text-2xl font-bold">Copy URL</a>
              <svg
                version="1.1"
                x="0px"
                y="0px"
                height={25}
                width={25}
                viewBox="0 0 115.77 122.88"
              >
                <g>
                  <path d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
