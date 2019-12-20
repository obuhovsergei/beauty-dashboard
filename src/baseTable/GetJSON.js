//Get Info from JSON
import Specialists_JSON from '../DB/Specialists';    // All Specialists
import List_Menu_JSON from '../DB/List_Menu';        // List menus for Orders
import List_Orders_JSON from '../DB/List_Orders';    // List Orders

//Push Info to LocalHost
if(localStorage.getItem('Specialists') === null) localStorage.setItem('Specialists', JSON.stringify(Specialists_JSON));
if(localStorage.getItem('List_Menu') === null) localStorage.setItem('List_Menu', JSON.stringify(List_Menu_JSON));
if(localStorage.getItem('List_Orders') === null) localStorage.setItem('List_Orders', JSON.stringify(List_Orders_JSON));

//Get Info from LocalHost
const Specialists = JSON.parse(localStorage.getItem("Specialists"));
const List_Menu = JSON.parse(localStorage.getItem("List_Menu"));
const List_Orders = JSON.parse(localStorage.getItem("List_Orders"));

export { Specialists, List_Menu, List_Orders }