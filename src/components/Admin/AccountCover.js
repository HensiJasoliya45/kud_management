import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Admin.css";
import "./AccountCover.css";

const AccountCover = () => {
  return (
   <>
    <div className="admin-dashboard">
      <Header />
      <div className="admin-container">
        <Sidebar />
        <div className="content">
          <div className="account-cover-wrapper">
            <div className="account-cover-section left-cover-section">
              <table className="cover-table">
                <thead>
                  <tr className="cover-table-header">
                    <th>તારીખ</th>
                    <th>ઉપલક દેવાનારનું નામ</th>
                    <th>કામ / વિભાગ / નોંધ</th>
                    <th>રકમ</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, index) => (
                    <tr key={index} className="cover-table-row">
                      <td className="cover-table-cell">&nbsp;</td>
                      <td className="cover-table-cell">&nbsp;</td>
                      <td className="cover-table-cell">&nbsp;</td>
                      <td className="cover-table-cell">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="cover-table-footer">
                    <td></td>
                    <td>TOTAL</td>
                    <td>TOTAL</td>
                    <td>0</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="account-cover-section right-cover-section">
              <table className="cover-table">
                <thead>
                <tr className="cover-table-heading-row">
                 <th className="cover-table-heading" colSpan="5">Cover</th>
                </tr>
                  <tr className="cover-table-header">
                    <th>તારીખ</th>
                    <th>વિભાગ</th>
                    <th>નોંધ / વિગત</th>
                    <th>રકમ</th>
                    <th>Clear Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="cover-table-row">
                    <td className="cover-table-cell">20/12/24</td>
                    <td className="cover-table-cell">Electrik</td>
                    <td className="cover-table-cell">Se. Alpeshbhagat</td>
                    <td className="cover-table-cell">283</td>
                    <td className="cover-table-cell"></td>
                  </tr>
                  {[...Array(9)].map((_, index) => (
                    <tr key={index} className="cover-table-row">
                      <td className="cover-table-cell">&nbsp;</td>
                      <td className="cover-table-cell">&nbsp;</td>
                      <td className="cover-table-cell">&nbsp;</td>
                      <td className="cover-table-cell">&nbsp;</td>
                      <td className="cover-table-cell">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default AccountCover;
