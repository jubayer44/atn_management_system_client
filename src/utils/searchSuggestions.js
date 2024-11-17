export const searchSuggestions = (data, searchTerm) => {
  if (searchTerm.length > 0) {
    return [
      ...new Set(
        data
          .filter((item) => {
            return (
              item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
              item?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
              item?.phone?.includes(searchTerm) ||
              item?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
              item?.address
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase()) ||
              item?.city?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
              item?.state?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
              item?.zip?.includes(searchTerm) ||
              item?.gender
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase()) ||
              item?.notes?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
              item?.weekendNo
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase()) ||
              item?.layDirector
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase()) ||
              item?.description
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase()) ||
              item?.dateBegin
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase()) ||
              item?.dateEnd
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase()) ||
              item?.abbreviation
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase())
            );
          })
          .flatMap((item) => {
            const matches = [];

            // Collect the full property values for the matching fields
            if (
              item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.name);
            }
            if (
              item?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.email);
            }
            if (item?.phone?.includes(searchTerm)) {
              matches.push(item.phone);
            }
            if (
              item?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.role);
            }
            if (
              item?.address?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.address);
            }
            if (
              item?.city?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.city);
            }
            if (
              item?.state?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.state);
            }
            if (item?.zip?.includes(searchTerm)) {
              matches.push(item.zip);
            }
            if (
              item?.gender?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.gender);
            }
            if (
              item?.notes?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.notes);
            }
            if (
              item?.weekendNo
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.weekendNo);
            }
            if (
              item?.layDirector
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.layDirector);
            }
            if (
              item?.description
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.description);
            }
            if (
              item?.dateBegin
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.dateBegin);
            }
            if (
              item?.dateEnd?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.dateEnd);
            }
            if (
              item?.abbreviation
                ?.toLowerCase()
                ?.includes(searchTerm?.toLowerCase())
            ) {
              matches.push(item.abbreviation);
            }

            return matches;
          })
      ),
    ];
  } else {
    return null;
  }
};
