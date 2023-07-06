function importGrallar(g){
    for (var prop in g) {
        if (g.hasOwnProperty(prop))
            window[prop] = g[prop];

    }
}

importGrallar(jasmine.grallar.FeatureStory);
importGrallar(jasmine.grallar.GWT);

var input;
beforeEach(function(){ input = $("<input />").appendTo("body").focus(); });
afterEach(function(){ input.remove();});
