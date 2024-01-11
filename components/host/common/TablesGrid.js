import { useContext } from "react";
import {
  ChairsInChild,
  TableGridChild,
  TableNoInChild,
  TablesGridParent,
} from "../styled/common.styled";
import { GlobalContext } from "../../../contextApi/Provider";

export default function TablesGrid({
  data,
  tablelist,
  handleTableSelect,
  selectedtable,
}) {
  // console.log(data.seatingarea);
  const { searchtablenum } = useContext(GlobalContext);
  const _tablelist = tablelist[0]?.tables
    ?.filter((val) => val.name.includes(searchtablenum[0]))
    ?.filter((val) => {
      if (
        (data.outsideindise[0] == "ALL" ||
          (data.outsideindise[0] == "Outside" && val.position == 1) ||
          (data.outsideindise[0] == "Inside" && val.position == 0)) &&
        (data.seatingarea[0] == "ALL" ||
          val.tagInfo.map((i) => i.name).includes(data.seatingarea[0])) &&
        data.familysingle[0] == "ALL" &&
        (data.availibility[0] == "ALL" ||
          (data.availibility[0] == "Available" && val.isAvailable == 1) ||
          (data.availibility[0] == "Busy" && val.isAvailable == 0)) &&
        (data.listingtoshow[0] == "ALL" ||
          (data.listingtoshow[0] == "1-2" &&
            val.chares >= 1 &&
            val.chares <= 2) ||
          (data.listingtoshow[0] == "2-4" &&
            val.chares >= 2 &&
            val.chares <= 4) ||
          (data.listingtoshow[0] == "4-6" &&
            val.chares >= 4 &&
            val.chares <= 6) ||
          (data.listingtoshow[0] == "6-8" &&
            val.chares >= 6 &&
            val.chares <= 8) ||
          (data.listingtoshow[0] == "8-12+" && val.chares >= 8))
      ) {
        return val;
      }
    })
    // {console.log(tablelist[0]?.tables.chaires)}
    .map((t, key) =>
      t.isActive ? (
        <TableGridChild
          key={key}
          className={
            t.isAvailable
              ? `available ${
                  selectedtable === t.id ? "available selected" : ""
                }`
              : selectedtable === t.id
              ? "selected"
              : ""
          }
          onClick={() => handleTableSelect(t.id)}>
          <TableNoInChild>{t.name}</TableNoInChild>
          <ChairsInChild>{t.chaires} PAX</ChairsInChild>
        </TableGridChild>
      ) : (
        ""
      )
    );
  // {console.log(tablelist[0]?.tables)}
  return <TablesGridParent className="fMmBtb">{_tablelist}</TablesGridParent>;
}
