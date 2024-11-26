/* eslint-disable react/prop-types */

const PrintTimeSheet = ({ headerData, rowData }) => {
  return (
    <div className="print-container w-full mx-auto mb-10">
      <h1 className="text-lg md:text-xl font-bold text-center mb-2 print-title">
        ATN Medical Transportation (LLC)
      </h1>

      {/* Table container for scroll on normal view */}
      <div className="table-container">
        <div className="table-content">
          <table className="min-w-full bg-white text-tColor">
            <thead>
              <tr>
                <th className="py-2 border-r border-b border-gray-400 text-xs md:text-sm px-1 text-center">
                  No
                </th>
                {headerData?.map((item, i) => (
                  <th
                    key={i}
                    className="py-2 border-r border-b border-gray-400 text-xs md:text-sm px-1 text-center text-nowrap"
                  >
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowData?.map((item, i) => (
                <tr key={i} className="border border-gray-400">
                  <td className="py-2 text-center border-gray-400 text-xs md:text-sm px-1 border-r">
                    {i + 1}
                  </td>
                  {Object.keys(item)?.map((key) => {
                    const exists = headerData?.some(
                      (header) => header.value === key
                    );
                    return (
                      key !== "id" &&
                      exists && (
                        <td
                          key={key}
                          className={`py-2 text-left border-gray-400 text-xs md:text-sm px-1 border-r ${
                            key === "memo"
                              ? "text-wrap min-w-[150px]"
                              : "text-nowrap"
                          }`}
                        >
                          {key === "tripReceipt" && item[key] ? (
                            <a
                              target="_blank"
                              href={item[key]}
                              className="text-blue-500 px-2"
                            >
                              View Receipt
                            </a>
                          ) : (
                            item[key]
                          )}
                        </td>
                      )
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrintTimeSheet;
