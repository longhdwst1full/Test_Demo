// import bcrypt from "bcryptjs";

const commonUtils = {
  isEmpty: (obj) => {
    // check obj is null or undefined
    if (!obj) return true;
    // check obj has elements

    return Object.keys(obj).length === 0;
  },

  getRandomInt: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  getRandomOTP: function () {
    return this.getRandomInt(100000, 999999);
  },

  // hashPassword: async (value) => {
  //   if (!value) return null;

  //   return await bcrypt.hash(value, 8);
  // },

  getPagination: (page, size, total) => {
    const totalPage = Math.ceil(+total / +size);
    // bỏ qua số phần tử 
    const skip = page * size;
    console.log(+Math.ceil(total / size),"yidrtrt")
    return {
      skip,
      limit: size,
      totalPage,
    };
  },
};

export default commonUtils;
