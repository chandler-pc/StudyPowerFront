import React from 'react';

function TopUsers({ users, currentUser }) {
  const top5 = users.slice(0, 5);
  const currentUserRank = users.findIndex(user => user.name === currentUser.name) + 1;

  return (
    <table className="table-fixed w-full">
      <tbody>
        {top5.map((user, index) => (
          <tr key={index} className="border-b-2 border-black/5 ">
            <td className="w-1/12 text-center">{index + 1}</td>
            <td className="w-8/12  p-3">{user.name}</td>
            <td className="w-3/12 text-right">{user.level}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="3" className="border-b-2 border-black/5 text-center p-3">...</td>
        </tr>
        <tr className="border-b-2 border-black/5">
          <td className="w-1/12 text-center">{currentUserRank}</td>
          <td className="w-8/12 p-3">{currentUser.name}</td>
          <td className="w-3/12 text-right">{currentUser.level}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TopUsers;
