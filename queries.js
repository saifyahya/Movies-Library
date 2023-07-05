const addQuery =` insert into movies(title,release_date,poster_path,overview,comment) values($1,$2,$3,$4,$5)`;
const selectQuery = "select *from movies";
const selectByIdQuery = "select * from movies where id =$1";
const deleteQuery = "delete from movies where id=$1";
const updateQuery ="update movies set comment= $1 where id =$2";

module.exports={
addQuery,
selectQuery,
selectByIdQuery,
deleteQuery,
updateQuery
}