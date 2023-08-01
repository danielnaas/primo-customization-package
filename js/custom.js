(function(){
  "use strict";
      
  var app = angular.module('viewCustom', ['angularLoad', 'aeonRequest', 'floorMaps', 'logoTweaks','hathiTrustAvailability','libChat','linksToKeep']);

///////////////////////////////////////////////////////////////////////////////////////////////
// Start universal header / footer stuff

//// make the footer
app.component('prmExploreFooterAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'ukhdrController',
  template: '<div></div>'
});

app.controller('ukhdrController', [function () {

// individual links for secondary header
// currently undefined since we're using built-in Primo header
let headerLinks = [
{name:"hdr.include", content:"0"},
{name:"hdr.home.label", content:"HOME"},
{name:"hdr.home.link", content:"https://"},
{name:"hdr.link1.label", content:"Link #1"},
{name:"hdr.link1.url", content:"https://"},
{name:"hdr.link2.label", content:"Link #2"},
{name:"hdr.link2.url", content:"https://"},
{name:"hdr.link3.label", content:"Link #3"},
{name:"hdr.link3.url", content:"https://"},
{name:"hdr.link4.label", content:"Link #4"},
{name:"hdr.link4.url", content:"https://"},
{name:"hdr.link5.label", content:"Link #5"},
{name:"hdr.link5.url", content:"https://"},
{name:"hdr.link6.label", content:"Link #6"},
{name:"hdr.link6.url", content:"https://"},
]

let addHeaderLink = document.createElement("meta");
for (let key in headerLinks) {
let name = headerLinks[key]["name"];
let content = headerLinks[key]["content"];
console.log(name, content);
addHeaderLink.name = name; 
addHeaderLink.content = content;
document.head.appendChild(addHeaderLink);
addHeaderLink = document.createElement("meta");
}

// end individual links

// adding the header right in here since we were having trouble
// with the trigger that other sites use
var ukDiv = document.createElement("div");
ukDiv.id = "ukheader";
ukDiv.innerHTML = `
<div class="ukl-ext-clamp">
  <div class="slab universal-header">
      <div class="slab__wrapper">
          <div class="universal-header__layout">
              <div class="universal-breadcrumb" role="region" aria-label="Breadcrumb">
                  <ul>
                      <li><a class="link--fancy-reverse" href="https://www.uky.edu" title="Back to University of Kentucky home page">University of Kentucky <sub>®</sub></a></li>
                      <li><a class="link--sans" href="https://libraries.uky.edu">UK Libraries</a></li>
                  </ul>
              </div>
              <div class="universal-nav" aria-pressed="false" role="region" aria-label="Navigation">
                  <div class="show-for-sr" id="UniversalNavLabel">University-wide Navigation</div>
                  <a class="my-uk-logo" href="https://myuk.uky.edu" title="Log into the myUK portal">
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 61 27" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="M57.878 24.676c0-.174.034-.337.1-.49a1.29 1.29 0 0 1 .668-.669c.152-.067.315-.1.488-.1s.336.033.488.1a1.29 1.29 0 0 1 .668.67c.066.152.1.315.1.49 0 .174-.034.336-.1.488a1.284 1.284 0 0 1-.668.671c-.152.067-.315.101-.488.101s-.336-.034-.488-.1a1.289 1.289 0 0 1-.668-.672 1.215 1.215 0 0 1-.1-.489zm.182 0a1.103 1.103 0 0 0 .314.763c.098.097.211.174.341.23.13.056.27.085.42.085a1.053 1.053 0 0 0 .758-.315c.096-.098.173-.211.23-.343.056-.13.084-.27.084-.42a1.06 1.06 0 0 0-.314-.761 1.053 1.053 0 0 0-.759-.316 1.054 1.054 0 0 0-.76.316 1.099 1.099 0 0 0-.314.761zm.8.722h-.182v-1.453h.557c.164 0 .281.034.352.103.068.069.104.168.104.3 0 .068-.01.125-.03.173a.358.358 0 0 1-.196.197.635.635 0 0 1-.138.043l.43.637h-.205l-.432-.637h-.26v.637zm0-.799h.233c.05 0 .1-.002.149-.005a.426.426 0 0 0 .133-.031.246.246 0 0 0 .097-.075.235.235 0 0 0 .037-.14.226.226 0 0 0-.029-.118.225.225 0 0 0-.075-.072.32.32 0 0 0-.104-.038.566.566 0 0 0-.117-.012h-.323v.491zm-46.745-6.412c0-.346.068-.833.162-1.227l.744-4c.326-1.782.187-2.591-1.07-2.591-.72 0-1.325.254-2.279.786l-1.371 8.142H5.952l1.071-6.338c.301-1.804.232-2.59-1-2.59-.744 0-1.326.254-2.28.786l-1.371 8.142H0l1.465-8.582L0 9.767v-.232l3.953-1.156.093.07-.326 2.15.094.07C5.394 9.235 6.65 8.518 7.79 8.518c1.278 0 1.814.925 1.836 2.105l.093.07c1.558-1.435 2.86-2.175 4.023-2.175 1.604 0 2.116 1.457 1.675 3.793l-.907 4.742c-.164.926.046 1.204 2.116 1.25l.068.162c-1.046.647-2.208 1.087-3.115 1.087-1.07 0-1.464-.578-1.464-1.365"></path><path d="M15.13 22.333c0-.754.44-1.416 1.188-1.416.945 0 1.451 1.028 1.407 2.284.968-.548 2.068-1.919 2.816-3.358-.616-3.265-1.672-6.988-2.31-8.587-.243-.594-.462-.822-.88-.822-.264 0-.704.092-1.364.343l-.132-.183c.858-1.096 1.848-2.033 2.75-2.033.77 0 1.166.389 1.54 1.142.572 1.097 1.386 4.134 1.826 7.217h.109a71.802 71.802 0 0 0 1.98-8.542h.176l2.023 1.006c-1.957 4.658-4.31 10.985-6.774 13.475-.858.867-1.606 1.347-2.486 1.347-1.165 0-1.87-.868-1.87-1.873m19.511-9.431h-1.71v-9.16h1.711V1.454h-7.983v2.29h1.71v9.16l2.281 2.29h3.992zm5.703 2.29h3.991l2.282-2.29V3.744h1.71v-2.29h-7.983v2.29h1.71v9.158h-1.71z"></path><path d="M48.469 17.339l4.99-5.01h2.28V10.04h-8.554v2.29h.856l-3.421 3.434h-4.847V12.33h1.71v-2.29H33.5v2.29h1.71v10.303H33.5v2.29h7.984v-2.29h-1.71V19.2h4.847l3.42 3.434h-.855v2.29h8.554v-2.29h-1.996z"></path><path d="M39.201.308v4.58h1.711v4.007H34.07V4.888h1.712V.308H25.516v4.58h1.711v8.587l2.85 2.862h3.992v5.152h-1.71v4.58h10.264v-4.58h-1.71v-1.146h3.136l1.996 2.005v3.721H56.88v-4.58h-2.567l-4.133-4.15 3.848-3.864h2.852v-4.58h-9.124V4.888h1.71V.308H39.2zm.571.573h9.125v3.435h-1.711v5.152h9.123v3.434h-2.565l-4.42 4.437 4.705 4.722h2.28v3.436h-9.693V22.06l-2.282-2.29h-3.991v2.29h1.71v3.436h-9.125V22.06h1.712v-6.297h-4.278l-2.566-2.576V4.316h-1.711V.88h9.124v3.435H33.5v5.152h7.985V4.316h-1.712V.88z"></path></g></svg><span class="show-for-sr">My UK</span></a>
              </div>
          </div>
      </div>
  </div>
</div>
`;
document.body.insertBefore(ukDiv, document.body.firstChild);

// adding bits and pieces related to header & footer
var addStuff = document.createElement("script");
addStuff.type = "text/javascript"; 
addStuff.src = "https://use.fontawesome.com/515bdf71f2.js";
document.head.appendChild(addStuff);

var addUKFooter = document.createElement("script");
addUKFooter.type = "text/javascript"; 
addUKFooter.src = "https://lib.uky.edu/webparts/ukhdr/2022/js/combofootershared.js";
document.head.appendChild(addUKFooter);
/*
var addUKHeader = document.createElement("script");
addUKHeader.type = "text/javascript"; 
addUKHeader.src = "https://lib.uky.edu/webparts/ukhdr/2022/js/universalheader.js";
document.head.appendChild(addUKHeader);
*/
var addHeaderFooterStyle = document.createElement("link");
addHeaderFooterStyle.rel = "stylesheet"; 
addHeaderFooterStyle.href = "https://ukylib-exhibit-test.org/ukhdr/2022/css/global_header_footer.css";
addHeaderFooterStyle.media = "all";
document.head.appendChild(addHeaderFooterStyle);

// console.log("script for universal added"); 

}]);

// trigger the window load event after more of the page exists
// since page load event triggers before <body> is created
/*
app.component('prmMainMenuAfter', {
     bindings: { parentCtrl: '<' },
     controller: function($scope) {
          setTimeout(function() {

          if(!document.getElementById("ukheader")) {
            const event = new Event('load');
            window.dispatchEvent(event);
          }

          }, 1000);
     }

}); 
*/

// end header footer part


///////////////////////////////////////////////////////////////////////////////////////////////
// Browzine Setup
// Begin BrowZine - Primo Integration...
window.browzine = {
  api: "https://public-api.thirdiron.com/public/v1/libraries/487",
  apiKey: "9db1fa95-2c15-4171-a26b-d95f00c1dc15",

  journalCoverImagesEnabled: true,

  journalBrowZineWebLinkTextEnabled: true,
  journalBrowZineWebLinkText: "View Journal Contents",

  articleBrowZineWebLinkTextEnabled: true,
  articleBrowZineWebLinkText: "View Issue Contents",

  articlePDFDownloadLinkEnabled: true,
  articlePDFDownloadLinkText: "Download PDF",

  articleLinkEnabled: true,
  articleLinkText: "Read Article",

  printRecordsIntegrationEnabled: true,
  
  showFormatChoice: false,
  showLinkResolverLink: true,
  enableLinkOptimizer: true,
  
  articleRetractionWatchEnabled: true,
  articleRetractionWatchText: "Retracted Article",

  unpaywallEmailAddressKey: "daniel.naas@uky.edu",
  
  articlePDFDownloadViaUnpaywallEnabled: false,
  articlePDFDownloadViaUnpaywallText: "Download PDF",

  articleLinkViaUnpaywallEnabled: false,
  articleLinkViaUnpaywallText: "Read Article",

  articleAcceptedManuscriptPDFViaUnpaywallEnabled: false,
  articleAcceptedManuscriptPDFViaUnpaywallText: "Download PDF",

  articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: false,
  articleAcceptedManuscriptArticleLinkViaUnpaywallText: "Read Article",
};

browzine.script = document.createElement("script");
browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
document.head.appendChild(browzine.script);


///////////////////////////////////////////////////////////////////////////////////////////////
// MODULE: aeonRequest  
// Description: Watches for specific locations and adds a request link to brief result
//              points to our Aeon (for Special Collections items)
angular.module('aeonRequest', [])
.component('aeonRequest', {
  bindings: { parentCtrl: '<' },
  controller: 'aeonRequestController',
  template: '<span ng-if="$ctrl.Mms" class="md-primoExplore-theme"><a ng-href="{{$ctrl.link}}"><img class="aeonicon" src="https://saalck-uky.primo.exlibrisgroup.com/discovery/custom/01SAA_UKY-UKY/img/UKAeonfavicon2.png">{{$ctrl.linkLabel}}</a></span><br/>'

})
.controller('aeonRequestController', [function () {
  this.$onInit = function () {
    console.log("Aeon triggered");
 {
  var self = this;
  self.Mms = null;
  // array of map sublocations
  var mapSubLocations = ['scimap', 'scimapovsz', 'scimapdma', 'scimapfich', 'scimapfilm', 'scimappost', 'scimapref', 'scimapsanb', 'scimaptopo', 'scimapvert'];
  if (self.parentCtrl.result.delivery.deliveryCategory[0] == "Alma-P") {
    //console.log("Blending Spesh into Map");
    console.log(self.parentCtrl.result.delivery);
    if (mapSubLocations.includes(self.parentCtrl.result.delivery.bestlocation.subLocationCode) || self.parentCtrl.result.delivery.bestlocation.libraryCode == "special") {
      self.Mms = self.parentCtrl.result.pnx.control.recordid[0];
      console.log("Yes to this one: " + self.Mms);
      try {
        this.urlTitle = "&ItemTitle=" + encodeURIComponent(self.parentCtrl.result.pnx.addata.btitle[0]);
      } catch (e) {
        this.urlTitle = "&ItemTitle=undefined";
      };

      try {
        this.urlCreator = "&ItemAuthor=" + encodeURIComponent(self.parentCtrl.result.pnx.sort.author[0]);
      } catch (e) {
        this.urlCreator = "&ItemAuthor=undefined"
      };

      try {
        this.urlCallNo = "&CallNumber=" + encodeURIComponent(self.parentCtrl.result.delivery.holding[0].callNumber);
      } catch (e) {
        this.urlCallNo = "&CallNumber=undefined";
      }

      try {
        this.urlSubLoc = "&Location=" + encodeURIComponent(self.parentCtrl.result.delivery.bestlocation.subLocation);
      } catch (e) {
        this.urlSubLoc = "&Location=undefined";
      }

      try {
        this.urlDate = "&ItemDate=" + encodeURIComponent(self.parentCtrl.result.pnx.display.creationdate);
      } catch (e) {
        this.urlDate = "&ItemDate=undefined";
      }

      try {
        this.urlSource = "&ItemInfo2=" + encodeURIComponent("https://saalck-uky.primo.exlibrisgroup.com/permalink/01SAA_UKY/15remem/" + self.parentCtrl.result.pnx.control.recordid[0]);
      } catch (e) {
        this.urlSource = "&ItemInfo2=Primo";
      }

      // Parameters that vary depending on how we want Aeon to handle the material
      // branch the label text here  - Submit Request to Special Colletions Research Center for special stuff, map otherwise
      if (self.parentCtrl.result.delivery.bestlocation.libraryCode == "special") {
        self.linkLabel = "Submit Request to Special Collections Research Center";
        this.urlGenre = "";
      } else {
        self.linkLabel = "Submit Request to Access This Map";
        this.urlGenre = "&rft.genre=map";
      }

      let urlCombined = this.urlGenre + this.urlTitle + this.urlCreator + this.urlCallNo + this.urlSubLoc + this.urlDate + this.urlSource;
      urlCombined = urlCombined.replace("'", "");
      self.link = "https://requests-libraries.uky.edu/logon?Action=10&Form=30&OpenURL?" + urlCombined;


    }
  }
};
  };
}]);

/////////////////////////////////////////////////////////////////////////////////////
// Module: logoTweaks
// Description: Adjusting the logo a bit to accomodate the unversal header
angular.module('logoTweaks', [])
.controller('prmLogoAfterController', [function () {
    var vm = this;
    vm.getIconLink = getIconLink;
    function getIconLink() {
        return vm.parentCtrl.iconLink;
    }
}])
.component('prmLogoAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmLogoAfterController',
    template: '<div class="ukhdr-titlebox"><a class="ukhdr-title no-under" title="InfoKat Discovery Homepage" href="https://infokat.uky.edu">InfoKat Discovery</a><div>'
  })
.component('prmSearchBarAfter',{
        bindings: {parentCtrl: '<'},
        template: '<div class="primo-search-logo"></div><div id="scopeNoteBox"></div>' 
});

/////////////////////////////////////////////////////////////////////////////////////
// Module: floorMaps
// Description: Adds a map image to full display when relevant (Pawan's integration)
angular.module('floorMaps', [])
.controller('libMapController', [function () {
  this.$onInit = function () { 
    console.log("Map triggered");   
  // just for debug purpose
  // var myvar = this;

  // we only show the map in only one instance of this directive prmFullViewServiceContainerAfter
  this.firstInstance = 1; // which instance
  this.showMap = this.parentCtrl.index === this.firstInstance;
  this.mapMessage = "";
  this.mapFileLocation = "";
  this.mapLocMessage = "";

  // get the availability status
  try {
      this.available = this.parentCtrl.item.delivery.bestlocation.availabilityStatus;
  } catch (e) {
      this.available = '';
  }

  // get the library where the item is located
  try {
      this.library = this.parentCtrl.item.delivery.bestlocation.libraryCode;
  } catch (e) {
      this.library = '';
  }

  // get the library where the item is located
    try {
      this.libraryName = this.parentCtrl.item.delivery.bestlocation.mainLocation;
  } catch (e) {
      this.libraryName = '';
  }
            
  // get the library location where the item is located
  try {
      this.location = this.parentCtrl.item.delivery.bestlocation.subLocationCode;
  } catch (e) {
      this.location = '';
  }

  var design = [{ location: "des", start_cn: " ", end_cn: " ", mapfile: "DesignLib_des.jpg", locMsg: "Pence Hall, Design Library, Book stacks." }, { location: "descd", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, CDROM, ask at desk." }, { location: "desdraw", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, drawings, ask at desk." }, { location: "desfilm", start_cn: " ", end_cn: " ", mapfile: "DesignLib_desfilm.jpg", locMsg: "Pence Hall, Design Library, Microfilm." }, { location: "desmap", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, maps, ask at desk." }, { location: "desovsz", start_cn: " ", end_cn: " ", mapfile: "DesignLib_desovsz.jpg", locMsg: "Pence Hall, Design Library, oversized books." }, { location: "desres", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, reserves, ask at desk." }, { location: "desser", start_cn: " ", end_cn: " ", mapfile: "DesignLib_desser.jpg", locMsg: "Pence Hall, Design Library, serials." }, { location: "desspcirc", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, ask at desk." }, { location: "desunder", start_cn: " ", end_cn: " ", mapfile: "DesignLib_desovsz.jpg", locMsg: "Pence Hall, Design Library, undersized books." }];

  var young = [{ location: "0CCCline5", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "0CCSeago6", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "None", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "UNASSIGNED", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "cm1st", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "gluck", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "ill", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "kyprob", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "mcyl5rot", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylthes.jpg", locMsg: "Young Library, 5th floor, central rotunda and north wing." }, { location: "mcylbook3", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_yl3.jpg", locMsg: "Young Library, 3rd floor, north and east wings, call number A to DX." }, { location: "mcylbook4", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary4_yl4.jpg", locMsg: "Young Library, 4th floor, call number E to PR." }, { location: "mcylbook5", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_yl5.jpg", locMsg: "Young Library, 5th floor, south and west wings, call number PR to Z." }, { location: "mcylcomp", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylai.jpg", locMsg: "Young Library, 3rd floor, south, west and north wings." }, { location: "mcylnine", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_mcylnine.jpg", locMsg: "Young Library, 3rd floor, north wing." }, { location: "mcylovsz", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylovsz.jpg", locMsg: "Young Library, 5th floor, west and north wings." }, { location: "mcylthes", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylthes.jpg", locMsg: "Young Library, 5th floor, north wing and central rotunda." }, { location: "percard", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "perfaofich", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "perfich", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "perfichk", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "perfilm", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "perkynews", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "permprnt", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "pernews", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "perrstr", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "probacq", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ref", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_ref.jpg", locMsg: "Young Library, 2nd floor, west wing." }, { location: "refcd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "refcds", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "refdisks", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "refo", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refo.jpg", locMsg: "Young Library, 2nd floor, west wing." }, { location: "refrdr", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "refrdrmf", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "refrdrsd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "refsd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refsd.jpg", locMsg: "Young Library, 2nd floor, west wing." }, { location: "refsdcens", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refsdcens.jpg", locMsg: "Young Library, 2nd floor, west wing." }, { location: "sd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylsd.jpg", locMsg: "Young Library, 5th floor, government publications." }, { location: "sdfich", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "sdfilm", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "sdload", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "sdrdx", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "yl", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "yl1d", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "yl2h", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "yl3", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_yl3.jpg", locMsg: "Young Library, 3rd floor, north and east wings, call number A to DX." }, { location: "yl3d", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "yl4", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary4_yl4.jpg", locMsg: "Young Library, 4th floor, call number E to PR." }, { location: "yl5", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_yl5.jpg", locMsg: "Young Library, 5th floor, south and west wings, call number PR to Z." }, { location: "yl5rot", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylthes.jpg", locMsg: "Young Library, 5th floor, central rotunda." }, { location: "yl7d", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylai", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylai.jpg", locMsg: "Young Library, 3rd floor, south, west and north wings." }, { location: "ylcirc", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "yleu", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_yleu.jpg", locMsg: "Young Library, 5th floor, north wing." }, { location: "ylfich", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "ylfilm", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "ylgb", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylgb.jpg", locMsg: "Young Library, 5th floor, north wing." }, { location: "ylgrnsl", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_ylgrnsl.jpg", locMsg: "Young Library, 2nd floor, central rotunda." }, { location: "ylhold", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylhold.jpg", locMsg: "Young Library, 3rd floor, north wing." }, { location: "yllon", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_yllon.jpg", locMsg: "Young Library, 5th floor, north wing." }, { location: "ylmedia", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "ylmedia7d", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "ylmediacir", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "ylmediares", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, ask at 1st floor circulation desk." }, { location: "ylnew", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_ylnew.jpg", locMsg: "Young Library, 1st floor, next to central staircase." }, { location: "ylovsz", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylovsz.jpg", locMsg: "Young Library, 5th floor, west and north wings." }, { location: "ylper", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylai.jpg", locMsg: "Young Library, 3rd floor, south, west and north wings." }, { location: "ylpero", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylpero.jpg", locMsg: "Young Library, 3rd floor, north wing." }, { location: "ylpersdu", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylpersdu.jpg", locMsg: "Young Library, 3rd floor, north wing." }, { location: "ylprbd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylpres", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylprlbl", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylprlt", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylprps", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylprrf", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylres", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylscott", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_ylgrnsl.jpg", locMsg: "Young Library, 2nd floor, central rotunda." }, { location: "ylsd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylsd.jpg", locMsg: "Young Library, 5th floor, north and east wings." }, { location: "ylsdov", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylsd.jpg", locMsg: "Young Library, 5th floor, north wing." }, { location: "ylthes", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylthes.jpg", locMsg: "Young Library 5th floor, north wing." }, { location: "ylun", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylun.jpg", locMsg: "Young Library, 5th floor, north wing." }, { location: "ymoncat", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ymonproctr", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ysercat", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "yserproctr", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }];

  var agriculture = [{ location: "ag1d", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_ask.jpg", locMsg: "Agriculture Science North building, AIC, ask at service desk." }, { location: "ag2h", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_ask.jpg", locMsg: "Agriculture Science North building, AIC, ask at service desk." }, { location: "ag3d", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_ask.jpg", locMsg: "Agriculture Science North building, AIC, ask at service desk." }, { location: "agcirc", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_ask.jpg", locMsg: "Agriculture Science North building, AIC, ask at service desk." }, { location: "agref", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_agref.jpg", locMsg: "Agriculture Science North building, AIC, reference." }, { location: "agres", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_agres.jpg", locMsg: "Agriculture Science North building, AIC, reserves." }, { location: "agser", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_agser.jpg", locMsg: "Agriculture Science North building, AIC, current serials." }, { location: "agvid", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_ask.jpg", locMsg: "Agriculture Science North building, AIC, ask at service desk." }];

  var education = [{ location: "ed", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "ed1d", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edaward", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edbutler", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edcirc", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "ederfich", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edfich", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edfilm", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edjfic", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edjnonfic", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edjpicbks", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edjya", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edres", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edser", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edtext", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edyanonfic", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "probeduc", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }];

  var finearts = [{ location: "fa", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_fa.jpg", locMsg: "Little Fine Arts Library, 2nd floor, books, collected editions, scores." }, { location: "fa1h", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, reserves, ask at desk." }, { location: "faartbk", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "facat", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "facd", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, CDROM, ask at desk." }, { location: "facirc", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "facoll", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_facoll.jpg", locMsg: "Little Fine Arts Library, 2nd floor, collected editions shelves." }, { location: "famctr", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, media center, ask at desk." }, { location: "famctrres", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "famfrm", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_famfrm.jpg", locMsg: "Little Fine Arts Library, 1st floor, microforms room." }, { location: "famini", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_famini.jpg", locMsg: "Little Fine Arts Library, 2nd floor, miniature scores." }, { location: "faniles", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "faovsz", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_faovsz.jpg", locMsg: "Little Fine Arts Library, 2nd floor, oversized book shelves." }, { location: "faovszsc", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_faovszsc.jpg", locMsg: "Little Fine Arts Library, 2nd floor, oversize score shelves." }, { location: "faport", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_faport.jpg", locMsg: "Little Fine Arts Library, 2nd floor, portfolios, all the way to the back." }, { location: "faref", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_faref.jpg", locMsg: "Little Fine Arts Library, 1st floor, reference." }, { location: "fares", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, reserves, ask at desk." }, { location: "faspec", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "faspecovsz", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "fawilcox", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "fagranovel", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_fagranovel.jpg", locMsg: "Little Fine Arts Library, 1st floor, graphic novels." }, { location: "desspec", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Fine Arts Library, ask at desk." }];

  var medicalcenter = [{ location: "mcarch", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcav", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcavjr", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcavr4", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcavrs", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcbind", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcbook", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccat", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccd", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccirc", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccl1d", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccl2d", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccl7d", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcclas", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcclic", start_cn: " ", end_cn: " ", mapfile: "MCL_mcclic.jpg", locMsg: "Williard Medical Education building, Medical Center Library, classics." }, { location: "mcill", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcinab", start_cn: " ", end_cn: " ", mapfile: "MCL_mcinab.jpg", locMsg: "Williard Medical Education building, Medical Center Library, indexes and abstracts." }, { location: "mcinal", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcjour", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcovsz", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcrefb", start_cn: " ", end_cn: " ", mapfile: "MCL_mcrefb.jpg", locMsg: "Williard Medical Education building, Medical Center Library, reference." }, { location: "mcres", start_cn: " ", end_cn: " ", mapfile: "MCL_mcres.jpg", locMsg: "Williard Medical Education building, Medical Center Library, permanent reserves." }, { location: "mcrs", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcstaf", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcunbo", start_cn: " ", end_cn: " ", mapfile: "MCL_mcunbo.jpg", locMsg: "Williard Medical Education building, Medical Center Library, unbound journals." }, { location: "medproc", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "medproctr", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }];

  var scieng = [{ location: "enref", start_cn: " ", end_cn: " ", mapfile: "SciEng3_enref.jpg", locMsg: "King building, Science Engineering Library, 3rd floor engineering reference." }, { location: "enrefind", start_cn: " ", end_cn: " ", mapfile: "SciEng3_enref.jpg", locMsg: "King building, Science Engineering Library, 3rd floor engineering reference." }, { location: "sci", start_cn: " ", end_cn: " ", mapfile: "SciEng3_sci.jpg", locMsg: "King building, Science Engineering Library, 3rd floor books." }, { location: "sci1d", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "sci3d", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "sciarch", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "scicd", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "scicirc", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "scijill", start_cn: " ", end_cn: " ", mapfile: "SciEng4_scijill.jpg", locMsg: "King building, Science Engineering Library, 4th floor, Jillson collection." }, { location: "sciky", start_cn: " ", end_cn: " ", mapfile: "SciEng4_scijill.jpg", locMsg: "King building, Science Engineering Library, 4th floor, Kentucky science collection." }, { location: "scimap", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapbks", start_cn: " ", end_cn: " ", mapfile: "SciEng3_sci.jpg", locMsg: "King building, Science Engineering Library, 3rd floor, map books." }, { location: "scimapdma", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapfich", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapfilm", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapovsz", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimappost", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapsanb", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimaptopo", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapvert", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scinew", start_cn: " ", end_cn: " ", mapfile: "SciEng3_scinew.jpg", locMsg: "King building, Science Engineering Library, 3rd floor new books." }, { location: "scinkt", start_cn: " ", end_cn: " ", mapfile: "SciEng4_scijill.jpg", locMsg: "King building, Science Engineering Library, 4th floor, non-Kentucky Theses." }, { location: "scirare", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "sciref", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "scires", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "sciser", start_cn: " ", end_cn: " ", mapfile: "SciEng4_sciser.jpg", locMsg: "King building, Science Engineering Library, 4th floor, science journals." }, { location: "sciwork", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }];

  // we should show the map only if it is available in the library
  if (this.available === "available" && this.showMap === true) {

      // determine the library where the title is available first
      switch (this.library) {
          case "design":
              this.currentLibrary = design;
              break;
          case "young":
              this.currentLibrary = young;
              break;
          case "aic":
              this.currentLibrary = agriculture;
              break;
          case "education":
              this.currentLibrary = education;
              break;
          case "finearts":
              this.currentLibrary = finearts;
              break;
          case "medical":
              this.currentLibrary = medicalcenter;
              break;
          case "science":
              this.currentLibrary = scieng;
              break;

          default:
              this.currentLibrary = null;
              this.showMap = false;
              break;
      }

      if (null === this.currentLibrary || false == this.showMap) {
          return;
      }

      // Now, determing the library location & image filename from the corresponding mapTable
      for (var i = 0; i < this.currentLibrary.length; i++) {
          if (this.currentLibrary[i].location == this.location) {
              this.mapFileLocation = "custom/01SAA_UKY-UKY/img/" + this.currentLibrary[i].mapfile;
              this.mapLocMessage = this.currentLibrary[i].locMsg;
              break;
          }
      }
      if ('' === this.mapFileLocation) {
          this.showMap = false;
          return;
      }

      this.containerWidth = document.getElementById('full-view-container').clientWidth;
      this.mapAreaRatio = 1; // amount of containerWidth map will occupy
      if (this.containerWidth > 600) {
          //this.mapAreaRatio = 0.5895;
          this.mapAreaRatio = 0.5;
      } else {
          this.mapAreaRatio = 0.75;
      }

      // console.log(this.mapAreaRatio);
      this.mapWidth = this.containerWidth * this.mapAreaRatio;
      this.mapHeight = this.mapWidth;

      var mapImage = document.getElementsByClassName('ic-map-img').item(this.firstInstance);

      if (mapImage) {
          this.mapDimensions = {
              height: this.mapHeight + 'px',
              width: this.mapWidth + 'px'
          };
      }

      // build the message to be shown
      if (this.mapLocMessage.length > 5) {
          this.mapMessage = "This item is available in  " + this.mapLocMessage;
      }
  } else {
      this.showMap = false;
  }

  if (1 == this.parentCtrl.index) {
      console.log("index: " + this.parentCtrl.index);
      console.log("available: " + this.available);
      console.log("callNumber: " + this.callNumber);
      console.log("library: " + this.library);
      console.log("location: " + this.location);
      console.log("mapfile", this.mapFileLocation);
      console.log("showMap", this.showMap);
      console.log("message: " + this.mapMessage);
  }
}
  //////////////////////// END HERE
}])
.component('prmFullViewServiceContainerAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'libMapController',
  template: '<div ng-show="$ctrl.showMap"><i class="fa fa-map mapToggleMap"></i><a id="mapToggleLink" href="" class="arrow-link md-primoExplore-theme" ng-click="mapToggle=(mapToggle ? false : true)">Show a map of {{$ctrl.libraryName}}</a><prm-icon id="mapToggleIcon" link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"><md-icon id="mapToggleIcon" class="md-primoExplore-theme"></md-icon></prm-icon>' + '<div ng-if="mapToggle"><code ng-show="$ctrl.debug" class="ic-debug">MAP PROBLEM</code>' + '<br /><br />' + '<div class="ic-map-div">' + '<img class="ic-map-img" ng-src="{{$ctrl.mapFileLocation}}" ng-style="$ctrl.mapDimensions", title={{$ctrl.mapMessage}}>' + '<canvas class="ic-map-canvas"></canvas>' + '</div>' + '</div></div>'
});
  
/////////////////////////////////////////////////////////////////////////////////////
// HathiTrust Public Domain Links
////////////////////////////////////////////////////////////////////////////////////
// License Information
/*
The MIT License (MIT)

Copyright (c) 2017 Regents of the University of Minnesota

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

angular
  .module('hathiTrustAvailability', [])
  .constant(
    'hathiTrustBaseUrl',
    'https://catalog.hathitrust.org/api/volumes/brief/json/'
  )
  .config([
    '$sceDelegateProvider',
    'hathiTrustBaseUrl',
    function ($sceDelegateProvider, hathiTrustBaseUrl) {
      var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
      urlWhitelist.push(hathiTrustBaseUrl + '**');
      $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
    },
  ])
  .factory('hathiTrust', [
    '$http',
    '$q',
    'hathiTrustBaseUrl',
    function ($http, $q, hathiTrustBaseUrl) {
      var svc = {};

      var lookup = function (ids) {
        if (ids.length) {
          var hathiTrustLookupUrl = hathiTrustBaseUrl + ids.join('|');
          return $http
            .jsonp(hathiTrustLookupUrl, {
              cache: true,
              jsonpCallbackParam: 'callback',
            })
            .then(function (resp) {
              return resp.data;
            });
        } else {
          return $q.resolve(null);
        }
      };

      // find a HT record URL for a given list of identifiers (regardless of copyright status)
      svc.findRecord = function (ids) {
        return lookup(ids)
          .then(function (bibData) {
            for (var i = 0; i < ids.length; i++) {
              var recordId = Object.keys(bibData[ids[i]].records)[0];
              if (recordId) {
                return $q.resolve(bibData[ids[i]].records[recordId].recordURL);
              }
            }
            return $q.resolve(null);
          })
          .catch(function (e) {
            console.error(e);
          });
      };

      // find a public-domain HT record URL for a given list of identifiers
      svc.findFullViewRecord = function (ids) {
        var handleResponse = function (bibData) {
          var fullTextUrl = null;
          for (var i = 0; !fullTextUrl && i < ids.length; i++) {
            var result = bibData[ids[i]];
            for (var j = 0; j < result.items.length; j++) {
              var item = result.items[j];
              if (item.usRightsString.toLowerCase() === 'full view') {
                fullTextUrl = result.records[item.fromRecord].recordURL;
                break;
              }
            }
          }
          return $q.resolve(fullTextUrl);
        };
        return lookup(ids)
          .then(handleResponse)
          .catch(function (e) {
            console.error(e);
          });
      };

      return svc;
    },
  ])
  .controller('hathiTrustAvailabilityController', [
    'hathiTrust',
    function (hathiTrust) {
      var self = this;

      self.$onInit = function () {
        if (!self.msg) self.msg = 'Full Text Available at HathiTrust';

        // prevent appearance/request iff 'hide-online'
        if (self.hideOnline && isOnline()) {
          return;
        }

        // prevent appearance/request iff 'hide-if-journal'
        if (self.hideIfJournal && isJournal()) {
          return;
        }

        // prevent appearance/request if item is unavailable
        if (self.ignoreCopyright && !isAvailable()) {
          //allow links for locally unavailable items that are in the public domain
          self.ignoreCopyright = false;
        }

        self.isVE =
          self.prmSearchResultAvailabilityLine.result['@id'].indexOf(
            'primaws'
          ) > -1;

        // look for full text at HathiTrust
        updateHathiTrustAvailability();
      };

      var isJournal = function () {
        var format =
          self.prmSearchResultAvailabilityLine.result.pnx.addata.format[0];
        return !(format.toLowerCase().indexOf('journal') == -1); // format.includes("Journal")
      };

      var isAvailable = function isAvailable() {
        var available =
          self.prmSearchResultAvailabilityLine.result.delivery.availability[0];
        return available.toLowerCase().indexOf('unavailable') == -1;
      };

      var isOnline = function () {
        var delivery =
          self.prmSearchResultAvailabilityLine.result.delivery || [];
        if (!delivery.GetIt1)
          return delivery.deliveryCategory.indexOf('Alma-E') !== -1;
        return self.prmSearchResultAvailabilityLine.result.delivery.GetIt1.some(
          function (g) {
            return g.links.some(function (l) {
              return l.isLinktoOnline;
            });
          }
        );
      };

      var formatLink = function (link) {
        return self.entityId ? link + '?signon=swle:' + self.entityId : link;
      };

      var isOclcNum = function (value) {
        // VE OCLC numbers include the 035 org prefix
        return self.isVE ? value.match(/^(\(ocolc\))\d+$/i) : true;
      };

      var updateHathiTrustAvailability = function () {
        var hathiTrustIds = (
          self.prmSearchResultAvailabilityLine.result.pnx.addata.oclcid || []
        )
          .filter(isOclcNum)
          .map(function (id) {
            return 'oclc:' + id.toLowerCase().replace('(ocolc)', '');
          });
        hathiTrust[self.ignoreCopyright ? 'findRecord' : 'findFullViewRecord'](
          hathiTrustIds
        ).then(function (res) {
          if (res) self.fullTextLink = formatLink(res);
        });
      };
    },
  ])
  .component('hathiTrustAvailability', {
    require: {
      prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine',
    },
    bindings: {
      entityId: '@',
      ignoreCopyright: '<',
      hideIfJournal: '<',
      hideOnline: '<',
      msg: '@?',
    },
    controller: 'hathiTrustAvailabilityController',
    template:
      '<span ng-if="$ctrl.fullTextLink" class="umnHathiTrustLink">\
                <md-icon alt="HathiTrust Logo">\
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0"\
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJN\
                  AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACNFBMVEXuegXvegTsewTveArw\
                  eQjuegftegfweQXsegXweQbtegnsegvxeQbvegbuegbvegbveQbtegfuegbvegXveQbvegbsfAzt\
                  plfnsmfpq1/wplPuegXvqFrrq1znr2Ptok/sewvueQfuegbtegbrgRfxyJPlsXDmlTznnk/rn03q\
                  pVnomkjnlkDnsGnvwobsfhPveQXteQrutHDqpF3qnUnpjS/prmDweQXsewjvrWHsjy7pnkvqqGDv\
                  t3PregvqhB3uuXjusmzpp13qlz3pfxTskC3uegjsjyvogBfpmkHpqF/us2rttXLrgRjrgBjttXDo\
                  gx/vtGznjzPtfhHqjCfuewfrjCnwfxLpjC7wtnDogBvssmjpfhLtegjtnEjrtnTmjC/utGrsew7s\
                  o0zpghnohB/roUrrfRHtsmnlkTbrvH3tnEXtegXvegTveQfqhyHvuXjrrGTpewrsrmXqfRHogRjt\
                  q2Dqewvqql/wu3vqhyDueQnwegXuegfweQPtegntnUvnt3fvxI7tfhTrfA/vzJvmtXLunEbtegrw\
                  egTregzskjbsxI/ouoPsqFzniyrz2K3vyZnokDLpewvtnkv30J/w17XsvYXjgBbohR7nplnso1L0\
                  1Kf40Z/um0LvegXngBnsy5juyJXvsGftrGTnhB/opVHoew7qhB7rzJnnmErkkz3splbqlT3smT3t\
                  tXPqqV7pjzHvunjrfQ7vewPsfA7uoU3uqlruoEzsfQ/vegf///9WgM4fAAAAFHRSTlOLi4uLi4uL\
                  i4uLi4uLi4tRUVFRUYI6/KEAAAABYktHRLvUtndMAAAAB3RJTUUH4AkNDgYNB5/9vwAAAQpJREFU\
                  GNNjYGBkYmZhZWNn5ODk4ubh5WMQERUTl5CUEpWWkZWTV1BUYlBWUVVT19BUUtbS1tHV0zdgMDQy\
                  NjE1MzRXsrC0sraxtWOwd3B0cnZxlXZz9/D08vbxZfDzDwgMCg4JdQsLj4iMio5hiI2LT0hMSk5J\
                  TUvPyMzKzmHIzcsvKCwqLiktK6+orKquYZCuratvaGxqbmlta+8QNRBl6JQ26Oru6e3rnzBx0uQ8\
                  aVGGvJopU6dNn1E8c9bsOXPniYoySM+PXbBw0eIlS5fl1C+PFRFlEBUVXbFy1eo1a9fliQDZYIHY\
                  9fEbNm7avEUUJiC6ddv2HTt3mSuBBfhBQEBQSEgYzOIHAHtfTe/vX0uvAAAAJXRFWHRkYXRlOmNy\
                  ZWF0ZQAyMDE2LTA5LTEzVDE0OjA2OjEzLTA1OjAwNMgVqAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAx\
                  Ni0wOS0xM1QxNDowNjoxMy0wNTowMEWVrRQAAAAASUVORK5CYII=" />\
                  </svg> \
                </md-icon>\
                <a target="_blank" ng-href="{{$ctrl.fullTextLink}}">\
                {{ ::$ctrl.msg }}\
                  <prm-icon external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>\
                </a>\
              </span>',
  });

/////////////////////////////////////////////////////////////////////////////////////    
// Brief Results container used for a few things (Aeon, BrowZine, HathiTrust)
app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
  this.$onInit = function(){
    {
      console.log("BrowZine triggered");
      window.browzine.primo.searchResult($scope);
    }
  };
});

  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController',
    template: '\n    <aeon-request parent-ctrl="$ctrl.parentCtrl"></aeon-request><hathi-trust-availability></hathi-trust-availability>'
  });


  // Start Google Analytics 
    window.googleAnalytics = {}
    googleAnalytics.script = document.createElement("script");
    googleAnalytics.script.src = "https://www.googletagmanager.com/gtag/js?id=G-M0PE7RCRHY";
    googleAnalytics.async = "true";
    document.head.appendChild(googleAnalytics.script);
   
    window.googleAnalytics2 = {}
    googleAnalytics2.script = document.createElement("script");
    googleAnalytics2.script.innerHTML = "  window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-M0PE7RCRHY');";
    document.head.appendChild(googleAnalytics2.script);
  
  // End Google Analytics

      
// SiteImprove Stuff 
  window.siteImprove = {}
  siteImprove.script = document.createElement("script");
  siteImprove.script.src = "https://siteimproveanalytics.com/js/siteanalyze_3628.js";
  siteImprove.async = "true";
  document.head.appendChild(siteImprove.script);


    // Adapted from Bond University Primo 
    // https://librarysearch.bond.edu.au/discovery/search?vid=61BOND_INST:BOND
		// Instantiate variables that will be reset repeatedly in the listener function
		var max = 0;
		var winHeight = 0;
		var scrollTop = 0;
		var foot = 0;
		// and let's have a small buffer before the footer
		var buffer = 50;
		window.addEventListener('scroll', function (e) {

			// Total length of document
			max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
			// Height of window
			winHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
			// Point of the top of the document visible on screen
			scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
			// Height of footer
			foot = Math.round(parseFloat(window.getComputedStyle(document.getElementById('ukfooter')).height));
			// check where we are in terms of scrolling and the footer
			if (scrollTop + winHeight >= max - foot) {
				document.querySelectorAll('.primo-scrollbar.is-stuck')[0].style.maxHeight = 'calc(100% - ' + Math.abs(max - winHeight - scrollTop - foot - buffer) + 'px)';
			} else {
				document.querySelectorAll('.primo-scrollbar.is-stuck')[0].style.maxHeight = 'calc(100% - 2em)';
			}
    })

/////////////////////////////////////////////////////////////////////////////////////
// Module: libChat
// Description: Add libchat widget

// Start chat
angular.module('libChat', [])
.controller('chatBox', [function () {
    console.log("start chat script");
    var lc = document.createElement('script'); 
    lc.type = 'text/javascript'; 
    lc.async = 'true';
    lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'v2.libanswers.com/load_chat.php?hash=79e25f267bd8a74fe0647b277141f6a2';
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(lc, s);
    console.log("end chat script");
}]).component('prmTopBarBefore', {
    bindings: { parentCtrl: '<' },
    controller: 'chatBox',
});

// End chat
/////////////////////////////////////////////////////////////////////////////////////   
// module: linksToKeep
// From Orbis Cascade Primo Toolkit: https://www.orbiscascade.org/programs/systems/pcsg/primo-ve-toolkit/hide-856-links/
// Description: A quick fix to support larger work phasing out 856 exproxy links
angular.module('linksToKeep', []).component('prmServiceLinksAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: function controller($document, linksToKeep) {
    angular.element(function () {
      if (linksToKeep.length > 0) {
        var lNodes = $document[0].querySelectorAll("prm-service-links > div > div > div");
        for (var i = 0; i < lNodes.length; i++) {
          console.log("reviewing link text");
          var eNode = lNodes[i];
          var span = eNode.querySelector("a > span");
          if (span != null) {
            if (!linksToKeep.includes(span.textContent.trim())) {
              eNode.style.display = "none";
            }
          }
        }
      }
    });
  }
}).value('linksToKeep', [
  "Terms of Use for Electronic Resources",
  "Display MARC cataloging record",
  "Check UK Library holdings for the journal.",
  "DOI Link",
  "Journal's Impact Factor according to InCites JCR",
  "ProQuest Dissertation Articles DIRECT LINK",
  "ProQuest dissertation DIRECT LINK"
]);

  })();