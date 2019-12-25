//Get Info from JSON
import Specialists_JSON from '../DB/Specialists';    // All Specialists
import List_Menu_JSON from '../DB/List_Menu';        // List menus for Orders
import List_Orders_JSON from '../DB/List_Orders';    // List Orders

//Push Info to LocalHost
if(localStorage.getItem('Specialists') === null) localStorage.setItem('Specialists', JSON.stringify(Specialists_JSON));
if(localStorage.getItem('ListMenu') === null) localStorage.setItem('ListMenu', JSON.stringify(List_Menu_JSON));
if(localStorage.getItem('ListOrders') === null) localStorage.setItem('ListOrders', JSON.stringify(List_Orders_JSON));

//Get Info from LocalHost
const Specialists = JSON.parse(localStorage.getItem("Specialists"));
const ListMenu = JSON.parse(localStorage.getItem("ListMenu"));
const ListOrders = JSON.parse(localStorage.getItem("ListOrders"));

export { Specialists, ListMenu, ListOrders }