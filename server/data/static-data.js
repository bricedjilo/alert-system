Meteor.methods({
	sites: function() {
		return [
			{name: "Burlington - 18",code: "BURL-18",buildings:[]},
			{name: "Casablanca - 59",code: "CBLA-59",building:[]},
			{name: "Casa Grande - 12",code: "CASA-12",building:[]},
			{name: "Dagneux - 60",code: "DAGN-60",building:[]},
			{name: "Decatur - 23",code: "DECA-23",building:[]},
			{name: "Dublin - 86",code: "DUBL-86",building:[]},
			{name: "Duxford - 10",code: "DUXF-10",building:[]},
			{name: "Illescas - 45",code: "ILLE-45",building:[]},
			{name: "Kent - 01",code: "KENT-1",building:[]},
			{name: "Leicester - 97",code: "LEIC-97",building:[]},
			{name: "Les Avenieres - 85",code: "LESB-85",building:[]},
			{name: "Nantes",code: "NANT",building:[]},
			{name: "Neumarkt - 30",code: "NEUM-30",building:[]},
			{name: "Parla - 40",code: "PARL-40",building:[]},
			{name: "Pasching",code: "PASC",building:[]},
			{name: "Pottsville - 14",code: "POTT-14",building:[]},
			{name: "Roussillon - 63",code: "ROUS-63",building:[]},
			{name: "Seguin - 31",code: "SEGU-31",building:[]},
			{name: "Salt Lake City Fibers - 91",code:"SLCF-91",building:[]},
			{name: "Salt Lake City Matrix - 92",code:"SLCM-92",
				building:[
					{number:"2486",desc:"Ice Scream",phone:"801-508-8118"},
					{number:"8132",desc:"Main Matrix Lab",phone:""}
				]
			},
			{name: "Stade - 50",code:"STAD-50",building:[]},
			{name: "Stamford - 75",code:"STAM-75",building:[]},
			{name: "Tianjin",code:"TIAN",building:[]},
			{name: "Welkenraedt - 20",code:"WELK-20",building:[]},
			{name: "Windsor - 07",code: "WIND-07",building:[]}
		];
	},
	incidentTypes: function() {
		return [
			{name:"GRIP/ISRA",code:"grip-isra"},{name:"GRIP/FTPC",code:"grip-ftpc"},
			{name:"Power Outage",code:"power-outage"},
			{name:"Network Outage",code:"network-outage"},
			{name:"Shift Production",code:"shift-production"},
			{name:"Zebra Printer",code:"shift-production"}
		];
	}
});
