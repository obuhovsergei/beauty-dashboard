import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseTable from './baseTable/Table'
//import { DndProvider } from 'react-dnd'
//import Backend from 'react-dnd-html5-backend'

/*function App() {
    return (
        <div className="App">
            <DndProvider backend={Backend}>
                <BaseTable />
            </DndProvider>
        </div>
    )
}*/

ReactDOM.render(<BaseTable />, document.getElementById('root'));
