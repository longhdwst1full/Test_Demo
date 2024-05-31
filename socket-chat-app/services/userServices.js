import NotFoundError from "../exception/NotFoundError.js";
import User from "../models/userModel.js";
import commonUtils from "../utils/commont.js";

const FRIEND_STATUS = ["FRIEND", "FOLLOWER", "YOU_FOLLOW", "NOT_FRIEND"];

class userService {
  // tóm tắt thông tin user (Summary)
  async getUserSummaryInfo(userName) {
    const user = await User.findOne(
      {
        username: userName,
      },
      "-_id username name avatar isActived"
    );

    if (!user) throw new NotFoundError("User");

    return user;
  }
  // get status friend  of user
  async getStatusFriendOfUser(_id, searchUsername) {
    await User.checkById(_id);
    const searchUserResult = await User.findByUsername(searchUsername);
  }

  // get list
  async getList(username, page, size) {
    const { skip, limit, totalPage } = commonUtils.getPagination(
      page,
      size,
      // đếm số bản ghi tìm theo điều kiện
      await User.countDocuments({
        username: { $regex: ".*" + username + ".*" },
      })
    );
    // tìm kiếm
    const users = await User.find(
      {
        username: { $regex: ".*" + username + ".*" },
      },
      "name username gender isActived isDeleted isAdmin"
    )
      .skip(skip)
      .limit(limit);
    console.log(
      {
        page,
        size,
        totalPage,
      },
      "pageSize"
    );
    return {
      data: users,
      page,
      size,
      totalPages: totalPage,
    };
  }

  async updateActived(userId, status) {
    const { nModified } = await User.updateOne(
      { _id: userId },
      { isDeleted: status }
    );
    console.log(nModified, "updated nModified");
    if (nModified === 0) throw new NotFoundError("User");
  }
}

export default new userService();
