const app = new Vue({
    el: '#app', 
    mounted: function() {
        this.preload();
    },
    data: {
        authors: [],
        articles: [],
        filteredAuthors: [],
        currentAuthorObj: ''
    },
    methods: {
        preload: function(event) {
            fetch("data/data.json")
            .then(response => response.json())
            .then(data => (this.parseData(data)))
        },
        parseData: function(data) {
            this.authors = data.authors;
            this.articles = data.articles;
        },
        clearFilteredAuthors: function() {
            this.clearArticleFilters();
            this.filteredAuthors = [];
        },
        addAuthorToFilter: function(authorObj) {
            let idx = this.filteredAuthors.indexOf(authorObj);

            if (idx === -1) {
                this.filteredAuthors.push(authorObj);
            } else {
                this.filteredAuthors.splice(idx, 1);
            }

            this.currentAuthorObj = authorObj;
            this.filterArticles();
        },
        filterArticles: function() {
            this.clearArticleFilters();
            this.addFilterToArticles();

        },
        clearArticleFilters: function() {
            this.articles.forEach(articleObj => {
                articleObj.links.forEach(linkObj => {
                    linkObj.filterCSS = "";
                });
            });
        },
        addFilterToArticles: function() {
            for(let articleIdx=0; articleIdx < this.articles.length; articleIdx++) {
                for(let linkIdx=0; linkIdx < this.articles[articleIdx].links.length; linkIdx++) {
                    totalAuthors = this.articles[articleIdx].links[linkIdx].Authors.length - 1;

                    for(let authorIdx=0; authorIdx < this.articles[articleIdx].links[linkIdx].Authors.length; authorIdx++) {
                        for(let filterAuthorIndex=0; filterAuthorIndex < this.filteredAuthors.length; filterAuthorIndex++) {
                            if (this.filteredAuthors[filterAuthorIndex].fullname.trim() === this.articles[articleIdx].links[linkIdx].Authors[authorIdx].fullname.trim()) {
                                this.articles[articleIdx].links[linkIdx].filterCSS = "visible";
                                break;
                            } else {
                                // DO NOT HIDE IF ALREADY FILTERED TO BE SHOWN
                                if (this.articles[articleIdx].links[linkIdx].filterCSS !== "visible") {
                                    this.articles[articleIdx].links[linkIdx].filterCSS = "hidden";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});