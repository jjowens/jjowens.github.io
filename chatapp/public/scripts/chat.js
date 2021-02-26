const app = new Vue({
    el: '#app', 
    data: {
        newPersonName: "",
        people: [],
        messages: [],
        editorCSS: "block",
        editorToggleText: "Hide Editor",
        messageLastIndex: 0,
        alternatePersonPerNewMessage: true,
        alternatePersonIndex: 0,
        alternateThemePerPerson: true,
        alternateThemeBackgroundIndex: 0,
        alternateThemeAlignmentIndex: 0,
        selectedPerson: {
            personName: ""
        },
        statusCSS: "none",
        statusText: "",
        batteryOptions: {
            batteryShow: true,
            batteryPercentage: "100"
        },
        chatOptions: {
            chatTitleShow: true,
            chatTitle: "Group Chat",
            defaultMessage: "Hi"
        },
        chatTitleVisible: "block",
        chatTitleEditorVisible: "hidden",
        themeBackgroundColours: [
            {
                colourName: "blue",
                colourValue: "bg-blue-400"
            },
            {
                colourName: "green",
                colourValue: "bg-green-400"
            },
            {
                colourName: "gray",
                colourValue: "bg-gray-400"
            }
        ],
        themeColours: [
            {
                colourName: "black",
                colourValue: "text-black"
            },
            {
                colourName: "white",
                colourValue: "text-white"
            }
        ],
        themeAlignments: [
            {
                alignName: "left",
                alignValue: "float-left"
            },
            {
                alignName: "right",
                alignValue: "float-right"
            }
        ]
    },
    methods: {
        addPerson: function(event) {
            if (this.newPersonName === "") {
                this.timedStatus("Please enter a name.", "status-warning");
                return;
            }

            let newPeople = this.newPersonName.split(",");

            for (let i = 0; i < newPeople.length; i++) {
                let person = this.createNewPerson(newPeople[i].trim());
                this.people.push(person);
            }

            this.newPersonName = "";
        },
        createNewPerson: function(name) {
            let backgroundColour = this.themeBackgroundColours[0];

            
            if (this.alternateThemePerPerson === true) {
                if (typeof this.themeBackgroundColours[this.alternateThemeBackgroundIndex] === 'undefined') {
                    this.alternateThemeBackgroundIndex = 0;    
                }

                backgroundColour = this.themeBackgroundColours[this.alternateThemeBackgroundIndex];
                this.alternateThemeBackgroundIndex += 1;
            }

            // CREATE NEW PERSON
            const obj = {
                personName: name,
                backgroundColour: backgroundColour,
                foregroundColour: this.themeColours[0],
                themeAlignment: this.themeAlignments[this.alternateThemeAlignmentIndex]
            };

            // UPDATE TEXT ALIGNMENT INDEX
            if (this.alternateThemeAlignmentIndex == 0) {
                this.alternateThemeAlignmentIndex = 1;
            } else {
                this.alternateThemeAlignmentIndex = 0;
            }

            return obj;
        },
        addMessage: function(event) {
            if (this.people.length === 0) {
                this.timedStatus("Please enter new names.", "status-warning");
                return;
            }

            let newName = "";
            let newPerson = this.createNewPerson(newName);

            if (this.alternatePersonPerNewMessage === true) {
                if (typeof this.people[this.alternatePersonIndex] === 'undefined') {
                    this.alternatePersonIndex = 0;    
                }

                newPerson = this.people[this.alternatePersonIndex];

            } else {
                newName = "Friend";
                newPerson = this.createNewPerson(newName);
            }

            const obj = {
                message: this.chatOptions.defaultMessage,
                messageIndex: this.messageLastIndex,
                personName: newPerson.personName,
                person: newPerson,
                messageVisible: "block",
                editorVisible: "hidden"
            };

            this.messages.push(obj);
            this.messageLastIndex = this.messageLastIndex + 1;
            this.alternatePersonIndex += 1;

            if (typeof this.people[this.alternatePersonIndex] === 'undefined') {
                this.alternatePersonIndex = 0;    
            }
        },
        clearAllMessages: function(event) {
            this.messages = [];
            this.messageLastIndex = 0;
            this.alternatePersonIndex = 0;
        },
        clearAllPeople: function(event) {
            this.people = [];
            this.alternateThemeBackgroundIndex = 0;
            this.alternatePersonIndex = 0;
        },
        toggleEditor: function(event) {
            let cssName = "block";
            let cssText = "Hide Editor";

            if (this.editorCSS == "block") {
                cssName = "hidden";
                cssText = "Show Editor";
            }

            this.editorCSS = cssName;
            this.editorToggleText = cssText;
        },
        timedStatus: function(text,css) {
            this.statusCSS = css;
            this.statusText = text;

            setTimeout(()=>{
                this.statusCSS = "";
                this.statusText = "";
            },5000);
        },
        toggleEditMessage: function(obj) {

            let messageVisible = "";
            let editorVisible = "";

            if (obj.editorVisible === "block") {
                messageVisible = "block";
                editorVisible = "hidden";
            } else {
                messageVisible = "hidden";
                editorVisible = "block";
            }

            obj.editorVisible = editorVisible;
            obj.messageVisible = messageVisible;

        },
        deleteMessage: function(obj) {
            if (obj === null) {
                return;
            }

            if (this.messages.indexOf(obj) === -1) {
                return;
            } else {
                let idx = this.messages.indexOf(obj);

                this.messages.splice(idx, 1);
            }

        },
        toggleEditTitle: function(event) {
            let titleVisible = "";
            let editorVisible = "";

            if (this.chatTitleEditorVisible === "block") {
                titleVisible = "block";
                editorVisible = "hidden";
            } else {
                titleVisible = "hidden";
                editorVisible = "block";
            }

            this.chatTitleVisible = titleVisible;
            this.chatTitleEditorVisible = editorVisible;

        },
    },
    computed: {
        orderedPeople: function() {
            return this.people.sort((a,b) => {
                if(a.personName < b.personName) return -1;
                if(a.personName > b.personName) return 1;
                return 0;
            });
        },
        orderedBackgroundColours: function() {
            return this.themeBackgroundColours.sort((a,b) => {
                if(a.colourName < b.colourName) return -1;
                if(a.colourName > b.colourName) return 1;
                return 0;
            });
        },
        orderedColours: function() {
            return this.themeColours.sort((a,b) => {
                if(a.colourName < b.colourName) return -1;
                if(a.colourName > b.colourName) return 1;
                return 0;
            });
        }
    }
});