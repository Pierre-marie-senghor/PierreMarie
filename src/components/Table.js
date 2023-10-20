import React, { useState, useEffect, useMemo    } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter} from "react-bootstrap-table2-filter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./Table.css"; 
import img from "../img/img.jpeg";



function Table() {

  const [showProfile, setShowProfile] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true); // Vous pouvez initialiser loggedIn en fonction de l'état de connexion actuel.
  
  
  
  {{loggedIn && (
    <button
      className="btn btn-primary mt-3"
      onClick={() => setShowProfile(!showProfile)}
    >
      Profil
    </button>
  )}
  
  {showProfile && (
    <div className="profile">
      {/* Mettez ici le contenu de votre profil */}
      <img src={img} alt="Avatar" className="profile-image" />
      <p>Nom: Manga</p>
      <p>Numéro de téléphone: +221 77346573</p>
      {/* Ajoutez d'autres détails du profil */}
    </div>
  )}
  
  {loggedIn && (
    <button
      className="btn btn-danger mt-3"
      onClick={() => setLoggedIn(false)}
    >
      Déconnexion
    </button>
  )}
  };

  
  //debut data
    const [data, setData] = useState([
      {
        image: img,
        name: "Manga",
        phoneNumber: "+221 77346573",
        date: "2023-08-07",
        arrivalTime: "10:00",
        status: "Patient",
      },
      {
        image: img,
        name: "Sambou",
        phoneNumber: "+221 7674899",
        date: "2023-08-07",
        arrivalTime: "11:00",
        status: "Medecin_Specialiste",
      },
      // ... Add more data objects
      {
        image: img,
        name: "Modou",
        phoneNumber: "+00 335346543",
        date: "2023-08-07",
        arrivalTime: "09:30",
        status: "Rendez_Vous",
      },
      {
        image: img,
        name: "Ida",
        phoneNumber: "+221 757489943",
        date: "2023-08-07",
        arrivalTime: "08:01",
        status: "Patient",
      },
      {
        image: img,
        name: "Seynabou",
        phoneNumber: "+221 787489900",
        date: "2023-08-07",
        arrivalTime: "09:00",
        status: "Medecin_Specialiste",
      },
      {
        image: img,
        name: "Abdou",
        phoneNumber: "+221 7774895423",
        date: "2023-08-07",
        arrivalTime: "10:30",
        status: "Rendez_Vous",
      },
      {
        image: img,
        name: "Anssou",
        phoneNumber: "+221 7674899213",
        date: "2023-08-07",
        arrivalTime: "07:00",
        status: "Patient",
      },
    ]);
  //fin data
  
  //debut customFiltre
    const customNameFilter = textFilter({
      placeholder: "entre le Nom",
      // ...
    });
  
    const customPhoneNumberFilter = textFilter({
      placeholder: "Entre le Numéro ",
      // ...
    });
    const customDateFilter = textFilter({
      placeholder: "Entre la Date",
      // ...
    });
    const customArrivalTimeFilter = textFilter({
      placeholder: "Entre l'Heure",
    // ...
    });
    const customStatusFilter = textFilter({
      placeholder: "Entre Status",
      // ...
    });
   //fin customFiltre
    
  //debut culumns
    const columns = [
      {
        dataField: "image",
        text: "Profil",
        formatter: (cell) => <img src={cell} alt="Avatar" className="image rounded-circle w-2" />,
      },
      {
        dataField: "name",
        text: "Nom",
        filter: customNameFilter, // Apply the custom filter
      },
      {
        dataField: "phoneNumber",
        text: "Numéro de téléphone",
        filter: customPhoneNumberFilter, // Apply the custom filter
      },
      {
        dataField: "date",
        text: "Date",
        filter: customDateFilter, // Apply the custom filter
      },
      {
        dataField: "arrivalTime",
        text: "ArrivalTime",
        filter: customArrivalTimeFilter, // Apply the custom filter
      },
      {
          dataField: "status",
          text: "Status",
          filter: customStatusFilter,
      },
      {
        dataField: 'actions',
        text: 'Actions',    
          formatter: (cell, row) => (   
            <div className="">
              <button className="for" onClick={() => handleAction("hide", row)}>
                <FontAwesomeIcon icon={faEyeSlash} />
              </button>
              <button className="for mx-1 " onClick={() => handleAction("edit", row)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="for" onClick={() => handleAction("delete", row)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ),
      },
      // ... Other column     
    ];
       const handleAction = (action, row) => {
        // Implement your CRUD actions here
        if (action === "hide") {
          // Handle hide action
        } else if (action === "edit") {
          // Handle edit action
        } else if (action === "delete") {
          // Handle delete action
          setData(prevData => prevData.filter(item => item !== row));
        }
       };
  // ...fin culumns
      
  // ...debut de button reglage des fonctionnalite All, Liste patient, Liste Medecin, Liste rendez-vous 
       const [activeButton, setActiveButton] = useState('All');
       const [filteredData, setFilteredData] = useState(data);
       
       const handleButtonClick = (category) => {
          setActiveButton(category);
      
          if (category === 'All') {
            setFilteredData(data);
          } else {
            const filtered = data.filter(item => item.status === category.toLowerCase());
            setFilteredData(filtered);
          }
        };
  // ...fin du button reglage des fonctionnalite All, Liste patient, Liste Medecin, Liste rendez-vous
  
  
     // ...debut de reglage  du button export to csv
        const generateCSVData = () => {
          const csvData = [];
          
          // Ajoutez d'abord les en-têtes CSV (correspondant à vos colonnes de données)
          const headers = ["Name", "PhoneNumber", "Date", "ArrivalTime", "Status"];
          csvData.push(headers);
  
          // Ajoutez les données CSV
          data.forEach((row) => {
            const rowData = [row.name, row.phoneNumber, row.date, row.arrivalTime, row.status];
            csvData.push(rowData);
          });
  
          return csvData;
        };
     // ...fin de reglage du button export to csv   
  
  
  
    // ...debut de reglage du navTabv
        const [activeTab, setActiveTab] = useState('patient'); 
        
  
        // Utilisez useMemo pour initialiser les variables de données
        const dataPatient = useMemo(() => [
          {
            image: img,
            name: "Faye",
            phoneNumber: "+221 77346573",
            date: "2023-08-07",
            arrivalTime: "10:00",
            status: "Patient",
          },
          {
            image: img,
            name: "Bamba",
            phoneNumber: "+221 7674899",
            date: "2023-08-07",
            arrivalTime: "11:00",
            status: "Patient",
          },
          {
            image: img,
            name: "Ibou",
            phoneNumber: "+00 335346543",
            date: "2023-08-07",
            arrivalTime: "09:30",
            status: "Patient",
          },
          {
            image: img,
            name: "Ando",
            phoneNumber: "+221 757489943",
            date: "2023-08-07",
            arrivalTime: "08:01",
            status: "Patient",
          },
          {
            image: img,
            name: "Bintou",
            phoneNumber: "+221 757489943",
            date: "2023-08-07",
            arrivalTime: "08:01",
            status: "Patient",
          },
          {
            image: img,
            name: "Daba",
            phoneNumber: "+221 757489943",
            date: "2023-08-07",
            arrivalTime: "08:01",
            status: "Patient",
          },
          {
            image: img,
            name: "Jean",
            phoneNumber: "+221 757489943",
            date: "2024-08-07",
            arrivalTime: "08:30",
            status: "Patient",
          },
          
          // Ajoutez plus d'enregistrements ici
        ], []);
  
        const dataMedecin = useMemo(() => [
          {
            image: img,
            name: "Modou",
            phoneNumber: "+00 335346543",
            date: "2023-08-07",
            arrivalTime: "09:30",
            status: "Medecin",
          },
          {
            image: img,
            name: "pierre",
            phoneNumber: "+221 757489943",
            date: "2023-08-07",
            arrivalTime: "08:01",
            status: "Medecin",
          },
          {
            image: img,
            name: "Senghor",
            phoneNumber: "+221 787489900",
            date: "2023-08-07",
            arrivalTime: "09:00",
            status: "Medecin",
          },
         
          // Ajoutez plus d'enregistrements ici
        ], []);
  
        const dataRendez_Vous = useMemo(() => [
          {
            image: img,
            name: "Diouf",
            phoneNumber: "+221 7774895423",
            date: "2023-08-07",
            arrivalTime: "10:30",
            status: "Rendez_Vous",
          },
          {
            image: img,
            name: "Diallo",
            phoneNumber: "+221 7674899213",
            date: "2023-08-07",
            arrivalTime: "07:00",
            status: "Rendez_Vous",
          },
          {
            image: img,
            name: "Rual Octe",
            phoneNumber: "+221 7674899213",
            date: "2023-08-07",
            arrivalTime: "07:00",
            status: "Rendez_Vous",
          },
          {
            image: img,
            name: "Sow",
            phoneNumber: "+221 787489900",
            date: "2023-08-07",
            arrivalTime: "09:00",
            status: "Rendez_Vous",
          },
          {
            image: img,
            name: "Ciss",
            phoneNumber: "+221 787489900",
            date: "2023-08-07",
            arrivalTime: "09:00",
            status: "Rendez_Vous",
          },
          {
            image: img,
            name: "Cissoko",
            phoneNumber: "+221 787489900",
            date: "2023-08-07",
            arrivalTime: "09:00",
            status: "Rendez_Vous",
          },
          // Ajoutez plus d'enregistrements ici
        ], []);
        const dataStatistique = useMemo(() => [
          {
            image: img,
            name: "Diouf",
            phoneNumber: "+221 7774895423",
            date: "2023-08-07",
            arrivalTime: "10:30",
            status: "Statistique",
          }
          // Ajoutez plus d'enregistrements ici
        ], []);
  
    
  useEffect(() => {
    const filterData = (data, currentHour, currentMinute) => {
      // Implémentez ici votre logique de filtrage
      // ...
  
      // Par défaut, retournez toutes les données
      return data;
    };
  
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
  
    // Choisissez les données appropriées en fonction de l'onglet actif
    let selectedData = [];
    if (activeTab === 'patient') {
      selectedData = dataPatient;
    } else if (activeTab === 'medecin') {
      selectedData = dataMedecin;
    } else if (activeTab === 'rendez_vous') {
      selectedData = dataRendez_Vous;
    } else if (activeTab === 'Statistique') {
      selectedData = dataStatistique;
    }
  
    // Filtrer les données et mettre à jour l'état
    const filteredData = filterData(selectedData, currentHour, currentMinute);
    setFilteredData(filteredData);
  }, [activeTab, setFilteredData, dataPatient, dataMedecin, dataRendez_Vous, dataStatistique]);
  
  // ...debut de reglage du navTab
    
  
    return (
      <div className="container">
        <div className="navtab">
          <div className="row">
            <div className="col-md-10 mt-5">
            <Tabs
                activeKey={activeTab}
                onSelect={(tab) => setActiveTab(tab)}
                id="controlled-tab-example"
                className="mb-3 liste"
              >
                  {/* <Tab eventKey="patient; medecin; rendez_vous" title="All">
                    <data data={activeTab === 'patient' ? (filteredData || dataPatient) : []} columns={columns} />
                  </Tab> */}
                  <Tab eventKey="patient" title="Liste patient">
                    <data data={activeTab === 'patient' ? (filteredData || dataPatient) : []} columns={columns} />
                  </Tab>
                  <Tab eventKey="medecin" title="Liste medecin">
                    <data data={activeTab === 'medecin' ? (filteredData || dataMedecin) : []} columns={columns} />
                  </Tab>
                  <Tab eventKey="rendez_vous" title=" Liste rendez_vous">
                    <data data={activeTab === 'rendez_vous' ? (filteredData || dataRendez_Vous) : []} columns={columns} />
                  </Tab>
                  <Tab eventKey="Statistique" title=" Statistique">
                    <data data={activeTab === 'Statistique' ? (filteredData || dataStatistique) : []} columns={columns} />
                  </Tab>
                  
           </Tabs>
           </div>
            <button type="button" className="btn btn-primar mt-5">
              <CSVLink data={generateCSVData()} filename={"Table_data.csv"}  className="btn-primar text-white" target="_blank">
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" className="icon mb-1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0V15H14.2053V10L12.7848 11.25V13.75H1.42053V1.25H12.7848V3.75L14.2053 5V0H0ZM11.6526 4.375L10.654 5.25375L12.4744 6.875H5.61536V8.125H12.4737L10.654 9.74625L11.6526 10.625L14.716 7.95L15.2032 7.5L14.7153 7.05L11.6519 4.375H11.6526Z" fill="white"/>
              </svg>{" "} Export to CSV
              </CSVLink>
            </button>
          </div>



      <div className="d-grid gap-2 d-md-block mb-5 mt-3 button">
        <button className={`btn btn-lg botton mx-3 ps-5 pe-5 ${activeButton === 'All' ? 'active' : ''}`}
          style={{ backgroundColor: activeButton === 'All' ? '#2D9CDB' : '',
          color: activeButton === 'All' ? 'white' : '', 
          border: activeButton === 'All' ? '2px solid #2D9CDB' : '',
        }}
          onClick={() => handleButtonClick('All')}>All
        </button>

        

        {/* <button className={`btn btn-lg botton mx-3 ${activeButton === 'Statistique' ? 'active' : ''}`}
          style={{ backgroundColor: activeButton === 'Statistique' ? '#2D9CDB' : '', 
          color: activeButton === 'Statistique' ? 'white' : '', 
          border: activeButton === 'Statistique' ? '2px solid #2D9CDB' : '',}}
          onClick={() => handleButtonClick('Statistique')}>Statistique
        </button> */}

      </div>
    </div>

      <div className="bootstraptable">
        <BootstrapTable
          bootstrap4
          keyField="name"
          data={activeTab === 'patient' ? (filteredData || dataPatient) : activeTab === 'medecin' ? (filteredData || dataMedecin) : activeTab === 'Rendez-vous' ? (filteredData || dataRendez_Vous) : (filteredData || dataStatistique) } 
          columns={columns}
          striped
          hover
          pagination={paginationFactory({
            sizePerPage: 5,
            sizePerPageList: [5, 10, 20],
            hidePageListOnlyOnePage: true,
          })}
          filter={filterFactory()} // Apply default filter factory
          wrapperClasses="table-responsive"
        />
      </div>
    </div>
  );
}

export default Table;




