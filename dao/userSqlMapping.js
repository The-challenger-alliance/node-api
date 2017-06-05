/**
 * Created by 亮杰 on 2017/6/3.
 */

var user={
    insert:'INSERT INTO User(UserId,UserName,UserAge,CreateDate) VALUES(uuid(),?,?,now())',
    update :'update User set UserName=?,UserAge=? where UserId=?',
    delete:'delete from User where UserId=?',
    queryById:'select * from User where UserId=?'
};
module.exports=user;
