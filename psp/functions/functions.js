exports.isEmpty = function isEmpty(value) {
    if (typeof value === "undefined" && !value) return true;
    else {
      if (value != "" && value != " ") return false;
      else return true;
    }
    return false;
  };