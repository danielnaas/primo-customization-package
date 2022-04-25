(function(){
    "use strict";
    'use strict';
        
    var app = angular.module('viewCustom', ['angularLoad']);

    // Start Maps->Aeon stuff
  app.component('mapRequest', {
    bindings: { parentCtrl: '<' },
    controller: 'mapRequestController',
    template: '<span ng-if="$ctrl.Mms" class="md-primoExplore-theme"><a ng-href="{{$ctrl.link}}"><img class="aeonicon" src="https://saalck-uky.primo.exlibrisgroup.com/discovery/custom/01SAA_UKY-UKY/img/UKAeonfavicon2.png">Submit Request to Access This Map</a></span>'

  });

  app.controller('mapRequestController', [function () {
    var self = this;
    self.Mms = null;

    // array of map sublocations
    var mapSubLocations = ['scimap', 'scimapovsz', 'scimapdma', 'scimapfich', 'scimapfilm', 'scimappost', 'scimapref', 'scimapsanb', 'scimaptopo', 'scimapvert'];
    //console.log(self.parentCtrl.result);
    if (self.parentCtrl.result.delivery.deliveryCategory[0] == "Alma-P") {
      if (mapSubLocations.includes(self.parentCtrl.result.delivery.bestlocation.subLocationCode)) {
        //console.log("Yes to this one");
        self.Mms = self.parentCtrl.result.pnx.control.recordid[0];
        console.log("Yes to this one: " + self.Mms);
        var urlGenre = "&rft.genre=map";
        var urlTitle = "&ItemTitle=" + encodeURIComponent(self.parentCtrl.result.pnx.addata.btitle[0]);
        var urlCreator = "&ItemAuthor=" + encodeURIComponent(self.parentCtrl.result.pnx.sort.author[0]);;
        var urlCallNo = "&CallNumber=" + encodeURIComponent(self.parentCtrl.result.delivery.holding[0].callNumber);
        var urlSubLoc = "&Location=" + encodeURIComponent(self.parentCtrl.result.delivery.bestlocation.subLocation);
        var urlDate = "&ItemDate=" + encodeURIComponent(self.parentCtrl.result.pnx.display.creationdate);
        var urlSource = "&ItemInfo2=" + encodeURIComponent("https://saalck-uky.primo.exlibrisgroup.com/permalink/01SAA_UKY/15remem/" + self.parentCtrl.result.pnx.control.recordid[0]);
        var urlCombined = urlGenre + urlTitle + urlCreator + urlCallNo + urlSubLoc + urlDate + urlSource + "rft.genre=gwen ";
        var urlCombined = urlCombined.replace("'", "");

        self.link = "https://requests-libraries.uky.edu/logon?Action=10&Form=30&OpenURL?" + urlCombined;
      }
    }
  }]);

    // End Maps->Aeon stuff
    
    // Start HathiTrust & BrowZine link stuff
    
    app.controller('SearchResultAvailabilityLineAfterController', [function () {
      var vm = this;
    }]);
    
    app.component('prmSearchResultAvailabilityLineAfter', {
      bindings: { parentCtrl: '<' },
      controller: 'SearchResultAvailabilityLineAfterController',
      template: '\n    <map-request parent-ctrl="$ctrl.parentCtrl"></map-request><hathi-trust-availability-studio parent-ctrl="$ctrl.parentCtrl"></hathi-trust-availability-studio><primo-studio-browzine parent-ctrl="$ctrl.parentCtrl"></primo-studio-browzine>\n'
    
    
    });
    
    // End HathiTurst & BrowZine link stuff
    
    // Start HathiTrust availability stuff
    
    /* LICENSING INFO FOR HATHITRUST INTEGRATION FROM UNIVERSITY OF MINNESOTA LIBRARIES
    https://github.com/UMNLibraries/primo-explore-hathitrust-availability
    
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
    
    angular.module('hathiTrustAvailability', []).value('hathiTrustIconPath', 'custom/CENTRAL_PACKAGE/img/hathitrust.svg').constant('hathiTrustBaseUrl', "https://catalog.hathitrust.org/api/volumes/brief/json/").config(['$sceDelegateProvider', 'hathiTrustBaseUrl', function ($sceDelegateProvider, hathiTrustBaseUrl) {
      var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
      urlWhitelist.push(hathiTrustBaseUrl + '**');
      $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
    }]).factory('hathiTrust', ['$http', '$q', function ($http, $q) {
      var svc = {};
      var hathiTrustBaseUrl = "https://catalog.hathitrust.org/api/volumes/brief/json/";
    
      svc.findFullViewRecord = function (ids) {
        var deferred = $q.defer();
    
        var handleResponse = function handleResponse(resp) {
          var data = resp.data;
          var fullTextUrl = null;
          for (var i = 0; !fullTextUrl && i < ids.length; i++) {
            var result = data[ids[i]];
            for (var j = 0; j < result.items.length; j++) {
              var item = result.items[j];
                  console.log("Hathi Rights Check: " + item.orig);
                  console.log("Hathi Rights Check: " + item.itemURL);
                  console.log("Hathi Rights Check: " + item.rightsCode);
                  // Here's where I told it to also watch for "ic" stuff that we're getting through ETAS
                  if (item.usRightsString.toLowerCase() === "full view") {
                  fullTextUrl = result.records[item.fromRecord].recordURL;
                  //console.log("HathiRightsCode: " + item.rightsCode);
                  console.log("HathiTextLink: " + fullTextUrl);
                  break;
              }
            }
          }
          deferred.resolve(fullTextUrl);
        };
    
        if (ids.length) {
          var hathiTrustLookupUrl = hathiTrustBaseUrl + ids.join('|');
          $http.jsonp(hathiTrustLookupUrl, { cache: true, jsonpCallbackParam: 'callback' }).then(handleResponse).catch(function (e) {
            console.log(e);
          });
        } else {
          deferred.resolve(null);
        }
    
        return deferred.promise;
      };
    
      return svc;
    }]).controller('hathiTrustAvailabilityStudioController', ['hathiTrust', 'hathiTrustIconPath', function (hathiTrust, hathiTrustIconPath) {
      var self = this;
      self.hathiTrustIconPath = hathiTrustIconPath;
    
      self.$onInit = function () {
        setDefaults();
        if (!(isOnline() && self.hideOnline)) {
          updateHathiTrustAvailability();
        }
      };
    
      var setDefaults = function setDefaults() {
        if (!self.msg) self.msg = 'Full text available at HathiTrust.';
      };
    
      var isOnline = function isOnline() {
        return self.prmSearchResultAvailabilityLine.result.delivery.GetIt1.some(function (g) {
          return g.links.some(function (l) {
            return l.isLinktoOnline;
          });
        });
      };
    
      var updateHathiTrustAvailability = function updateHathiTrustAvailability() {
        var hathiTrustIds = (self.prmSearchResultAvailabilityLine.result.pnx.addata.oclcid || []).map(function (id) {
          console.log ("oclc:" + id);
          if (id.includes("ocolc")) {
          return "oclc:" + id;
          }
        });
        hathiTrust.findFullViewRecord(hathiTrustIds).then(function (res) {
          self.fullTextLink = res;
        });
      };
    }]).component('hathiTrustAvailabilityStudio', {
      require: {
        prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine'
      },
      bindings: {
        hideOnline: '<',
        msg: '@?'
      },
      controller: 'hathiTrustAvailabilityStudioController',
      template: '<span ng-if="$ctrl.fullTextLink" class="umnHathiTrustLink">\
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
                  </span>'
    });
    
    app.requires.push('hathiTrustAvailability');
    
    // End HathiTrust Availability stuff
    
    // Start BrowZine Availability stuff
    
    app.constant('primoStudioBrowzineStudioConfig', [{ "journalCoverImagesEnabled": true, "journalBrowZineWebLinkTextEnabled": true, "journalBrowZineWebLinkText": "View Journal Contents", "articleBrowZineWebLinkTextEnabled": true, "articleBrowZineWebLinkText": "View Issue Contents", "articlePDFDownloadLinkEnabled": true, "articlePDFDownloadLinkText": "Download PDF", "printRecordsIntegrationEnabled": true, "libraryId": "487", "apiKey": "9db1fa95-2c15-4171-a26b-d95f00c1dc15" }]);
    
    PrimoStudioBrowzineController.$inject = ["$scope", "primoStudioBrowzineStudioConfig"];
    
    function isBrowzineLoaded() {
      var validation = false;
      var scripts = document.head.querySelectorAll("script");
    
      if (scripts) {
        Array.prototype.forEach.call(scripts, function (script) {
          if (script.src.indexOf("browzine-primo-adapter") > -1) {
            validation = true;
          }
        });
      }
    
      return validation;
    };
    
    function PrimoStudioBrowzineController($scope, studioConfig) {
      if (!isBrowzineLoaded()) {
        if (studioConfig[0]) {
          if (!studioConfig[0].libraryId) {
            console.log("Missing required Primo Studio BrowZine addon field: libraryId");
          }
    
          if (!studioConfig[0].apiKey) {
            console.log("Missing required Primo Studio BrowZine addon field: apiKey");
          }
        } else {
          console.log("Missing Primo Studio BrowZine addon configuration: studioConfig");
        }
    
        window.browzine = {
          libraryId: studioConfig[0].libraryId,
          apiKey: studioConfig[0].apiKey,
          journalCoverImagesEnabled: studioConfig[0].journalCoverImagesEnabled,
          journalBrowZineWebLinkTextEnabled: studioConfig[0].journalBrowZineWebLinkTextEnabled,
          journalBrowZineWebLinkText: studioConfig[0].journalBrowZineWebLinkText,
          articleBrowZineWebLinkTextEnabled: studioConfig[0].articleBrowZineWebLinkTextEnabled,
          articleBrowZineWebLinkText: studioConfig[0].articleBrowZineWebLinkText,
          articlePDFDownloadLinkEnabled: studioConfig[0].articlePDFDownloadLinkEnabled,
          articlePDFDownloadLinkText: studioConfig[0].articlePDFDownloadLinkText,
          printRecordsIntegrationEnabled: studioConfig[0].printRecordsIntegrationEnabled
        };
    
        window.browzine.script = document.createElement("script");
        window.browzine.script.src = "https://saalck-uky.primo.exlibrisgroup.com/discovery/custom/01SAA_UKY-UKY/js/browzine-primo-adapter.js";
        window.document.head.appendChild(window.browzine.script);
      }
    
      (function poll() {
        if (isBrowzineLoaded() && window.browzine.primo) {
          window.browzine.primo.searchResult($scope);
        } else {
          requestAnimationFrame(poll);
        }
      })();
    };
    
    var PrimoStudioBrowzineComponent = {
      selector: "primoStudioBrowzine",
      controller: PrimoStudioBrowzineController,
      bindings: { parentCtrl: "<" }
    };
    
    var PrimoStudioBrowzineModule = angular.module("primoStudioBrowzine", []).component(PrimoStudioBrowzineComponent.selector, PrimoStudioBrowzineComponent).name;
    
    app.requires.push(PrimoStudioBrowzineModule);
    
    // End BrowZine Availability stuff
    
    // Start Google Analytics 
      window.googleAnalytics = {}
      googleAnalytics.script = document.createElement("script");
      googleAnalytics.script.src = "https://www.googletagmanager.com/gtag/js?id=UA-136163678-1";
      googleAnalytics.async = "";
      document.head.appendChild(googleAnalytics.script);
     
      window.googleAnalytics2 = {}
      googleAnalytics2.script = document.createElement("script");
      googleAnalytics2.script.innerHTML = "  window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-136163678-1');";
      document.head.appendChild(googleAnalytics2.script);
    
    // End Google Analytics
    
    // Other Google Analytics stuff
    app.constant('googleAnalyticsConfig', {
      trackingId: 'UA-136163678-1',
      // use null to specify an external script shouldn't be loaded
      externalScriptURL: null,
      // copy from script snippet from Google if you're running legacy Google Analytics
      inlineScript: `
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-136163678-1']);
        _gaq.push(['_trackPageview']);
     
        (function() {
          var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
          ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
      `
    })
    
    // Start Logo stuff
    
    // Add Clickable Logo
    app.controller('prmLogoAfterController', [function () {
        var vm = this;
        vm.getIconLink = getIconLink;
        function getIconLink() {
            return vm.parentCtrl.iconLink;
        }
    }]);
    
    app.component('prmLogoAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'prmLogoAfterController',
        template: '<div class="product-logo product-logo-local" layout="row" id="banner" tabindex="0" role="banner">' + '<a title="UK Libraries Homepage" href="https://libraries.uky.edu"><img class="logo-image" alt="{{::(&apos;nui.header.LogoAlt&apos; | translate)}}" ng-src="{{$ctrl.getIconLink()}}"/></a></div>'
    });
    
    // Add InfoKat Discovery icon next to search bar
    app.component('prmSearchBarAfter',{
            bindings: {parentCtrl: '<'},
            template: '<div class="primo-search-logo"><a href="https://saalck-uky.primo.exlibrisgroup.com/discovery/search?vid=01SAA_UKY:UKY"><img ng-src="custom/01SAA_UKY-UKY/img/library-logo-s.png" src="custom/01SAA_UKY-UKY/img/library-logo-s.png" alt="InfoKat Discovery"></a></div>' 
    });
    
    // End logo stuff
    
    // start map stuff
    app.controller('libMapController', [function () {
    
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
    }]);
    
    // The final piece of the puzzle
    app.component('prmFullViewServiceContainerAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'libMapController',
        template: '<div ng-show="$ctrl.showMap"><i class="fa fa-map mapToggleMap"></i><a id="mapToggleLink" href="" class="arrow-link md-primoExplore-theme" ng-click="mapToggle=(mapToggle ? false : true)">Show a map of {{$ctrl.libraryName}}</a><prm-icon id="mapToggleIcon" link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"><md-icon id="mapToggleIcon" class="md-primoExplore-theme"></md-icon></prm-icon>' + '<div ng-if="mapToggle"><code ng-show="$ctrl.debug" class="ic-debug">MAP PROBLEM</code>' + '<br /><br />' + '<div class="ic-map-div">' + '<img class="ic-map-img" ng-src="{{$ctrl.mapFileLocation}}" ng-style="$ctrl.mapDimensions", title={{$ctrl.mapMessage}}>' + '<canvas class="ic-map-canvas"></canvas>' + '</div>' + '</div></div>'
    });
    
    // End final piece
    
    
    var design = [{ location: "des", start_cn: " ", end_cn: " ", mapfile: "DesignLib_des.jpg", locMsg: "Pence Hall, Design Library, Book stacks." }, { location: "descd", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, CDROM, ask at desk." }, { location: "desdraw", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, drawings, ask at desk." }, { location: "desfilm", start_cn: " ", end_cn: " ", mapfile: "DesignLib_desfilm.jpg", locMsg: "Pence Hall, Design Library, Microfilm." }, { location: "desmap", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, maps, ask at desk." }, { location: "desovsz", start_cn: " ", end_cn: " ", mapfile: "DesignLib_desovsz.jpg", locMsg: "Pence Hall, Design Library, oversized books." }, { location: "desres", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, reserves, ask at desk." }, { location: "desser", start_cn: " ", end_cn: " ", mapfile: "DesignLib_desser.jpg", locMsg: "Pence Hall, Design Library, serials." }, { location: "desspcirc", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, ask at desk." }, { location: "desspec", start_cn: " ", end_cn: " ", mapfile: "DesignLib_checkatdesk.jpg", locMsg: "Pence Hall, Design Library, ask at desk." }, { location: "desunder", start_cn: " ", end_cn: " ", mapfile: "DesignLib_desovsz.jpg", locMsg: "Pence Hall, Design Library, undersized books." }];
    
    var young = [{ location: "0CCCline5", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "0CCSeago6", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "None", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "UNASSIGNED", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "cm1st", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "gluck", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "ill", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "kyprob", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "mcyl5rot", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylthes.jpg", locMsg: "Young Library, 5th floor, central rotunda and north wing." }, { location: "mcylbook3", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_yl3.jpg", locMsg: "Young Library, 3rd floor, north and east wings, call number A to DX." }, { location: "mcylbook4", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary4_yl4.jpg", locMsg: "Young Library, 4th floor, call number E to PR." }, { location: "mcylbook5", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_yl5.jpg", locMsg: "Young Library, 5th floor, south and west wings, call number PR to Z." }, { location: "mcylcomp", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylai.jpg", locMsg: "Young Library, 3rd floor, south, west and north wings." }, { location: "mcylnine", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_mcylnine.jpg", locMsg: "Young Library, 3rd floor, north wing." }, { location: "mcylovsz", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylovsz.jpg", locMsg: "Young Library, 5th floor, west and north wings." }, { location: "mcylthes", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylthes.jpg", locMsg: "Young Library, 5th floor, north wing and central rotunda." }, { location: "percard", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "perfaofich", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "perfich", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "perfichk", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "perfilm", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "perkynews", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "permprnt", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "pernews", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "perrstr", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "probacq", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ref", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_ref.jpg", locMsg: "Young Library, 2nd floor, west wing." }, { location: "refcd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "refcds", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "refdisks", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "refo", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refo.jpg", locMsg: "Young Library, 2nd floor, west wing." }, { location: "refrdr", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "refrdrmf", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "refrdrsd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "refsd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refsd.jpg", locMsg: "Young Library, 2nd floor, west wing." }, { location: "refsdcens", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refsdcens.jpg", locMsg: "Young Library, 2nd floor, west wing." }, { location: "sd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylsd.jpg", locMsg: "Young Library, 5th floor, government publications." }, { location: "sdfich", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "sdfilm", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "sdload", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "sdrdx", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "yl", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_refdesk.jpg", locMsg: "Young Library, 2nd floor, north wing, ask at reference desk." }, { location: "yl1d", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "yl2h", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "yl3", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_yl3.jpg", locMsg: "Young Library, 3rd floor, north and east wings, call number A to DX." }, { location: "yl3d", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "yl4", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary4_yl4.jpg", locMsg: "Young Library, 4th floor, call number E to PR." }, { location: "yl5", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_yl5.jpg", locMsg: "Young Library, 5th floor, south and west wings, call number PR to Z." }, { location: "yl5rot", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylthes.jpg", locMsg: "Young Library, 5th floor, central rotunda." }, { location: "yl7d", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylai", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylai.jpg", locMsg: "Young Library, 3rd floor, south, west and north wings." }, { location: "ylcirc", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "yleu", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_yleu.jpg", locMsg: "Young Library, 5th floor, north wing." }, { location: "ylfich", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "ylfilm", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_per.jpg", locMsg: "Young Library, 2nd floor, east wing, ask at periodicals desk." }, { location: "ylgb", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylgb.jpg", locMsg: "Young Library, 5th floor, north wing." }, { location: "ylgrnsl", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_ylgrnsl.jpg", locMsg: "Young Library, 2nd floor, central rotunda." }, { location: "ylhold", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylhold.jpg", locMsg: "Young Library, 3rd floor, north wing." }, { location: "yllon", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_yllon.jpg", locMsg: "Young Library, 5th floor, north wing." }, { location: "ylmedia", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary0_ylmedia.jpg", locMsg: "Young Library, basement, ask at audio visual desk." }, { location: "ylmedia7d", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary0_ylmedia.jpg", locMsg: "Young Library, basement, ask at audio visual desk." }, { location: "ylmediacir", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary0_ylmedia.jpg", locMsg: "Young Library, basement, ask at audio visual desk." }, { location: "ylmediares", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary0_ylmedia.jpg", locMsg: "Young Library, basement, ask at audio visual desk." }, { location: "ylnew", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_ylnew.jpg", locMsg: "Young Library, 1st floor, next to central staircase." }, { location: "ylovsz", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylovsz.jpg", locMsg: "Young Library, 5th floor, west and north wings." }, { location: "ylper", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylai.jpg", locMsg: "Young Library, 3rd floor, south, west and north wings." }, { location: "ylpero", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylpero.jpg", locMsg: "Young Library, 3rd floor, north wing." }, { location: "ylpersdu", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary3_ylpersdu.jpg", locMsg: "Young Library, 3rd floor, north wing." }, { location: "ylprbd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylpres", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylprlbl", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylprlt", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylprps", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylprrf", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylres", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ylscott", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary2_ylgrnsl.jpg", locMsg: "Young Library, 2nd floor, central rotunda." }, { location: "ylsd", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylsd.jpg", locMsg: "Young Library, 5th floor, north and east wings." }, { location: "ylsdov", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylsd.jpg", locMsg: "Young Library, 5th floor, north wing." }, { location: "ylthes", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylthes.jpg", locMsg: "Young Library 5th floor, north wing." }, { location: "ylun", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary5_ylun.jpg", locMsg: "Young Library, 5th floor, north wing." }, { location: "ymoncat", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ymonproctr", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "ysercat", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }, { location: "yserproctr", start_cn: " ", end_cn: " ", mapfile: "YoungLibrary1_circ.jpg", locMsg: "Young Library, 1st floor, ask at circulation desk." }];
    
    var agriculture = [{ location: "ag1d", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_ask.jpg", locMsg: "Agriculture Science North building, AIC, ask at service desk." }, { location: "ag2h", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_ask.jpg", locMsg: "Agriculture Science North building, AIC, ask at service desk." }, { location: "ag3d", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_ask.jpg", locMsg: "Agriculture Science North building, AIC, ask at service desk." }, { location: "agcirc", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_ask.jpg", locMsg: "Agriculture Science North building, AIC, ask at service desk." }, { location: "agref", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_agref.jpg", locMsg: "Agriculture Science North building, AIC, reference." }, { location: "agres", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_agres.jpg", locMsg: "Agriculture Science North building, AIC, reserves." }, { location: "agser", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_agser.jpg", locMsg: "Agriculture Science North building, AIC, current serials." }, { location: "agvid", start_cn: " ", end_cn: " ", mapfile: "AgInfoCenter_ask.jpg", locMsg: "Agriculture Science North building, AIC, ask at service desk." }];
    
    var education = [{ location: "ed", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "ed1d", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edaward", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edbutler", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edcirc", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "ederfich", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edfich", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edfilm", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edjfic", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edjnonfic", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edjpicbks", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edjya", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edres", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edser", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "edtext", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }, { location: "edyanonfic", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ed.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, books." }, { location: "probeduc", start_cn: " ", end_cn: " ", mapfile: "EducationLibrary_ask.jpg", locMsg: "Dickey Hall, 2nd floor, Education Library, ask at service desk." }];
    
    var finearts = [{ location: "fa", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_fa.jpg", locMsg: "Little Fine Arts Library, 2nd floor, books, collected editions, scores." }, { location: "fa1h", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, reserves, ask at desk." }, { location: "faartbk", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "facat", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "facd", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, CDROM, ask at desk." }, { location: "facirc", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "facoll", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_facoll.jpg", locMsg: "Little Fine Arts Library, 2nd floor, collected editions shelves." }, { location: "famctr", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, media center, ask at desk." }, { location: "famctrres", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "famfrm", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_famfrm.jpg", locMsg: "Little Fine Arts Library, 1st floor, microforms room." }, { location: "famini", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_famini.jpg", locMsg: "Little Fine Arts Library, 2nd floor, miniature scores." }, { location: "faniles", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "faovsz", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_faovsz.jpg", locMsg: "Little Fine Arts Library, 2nd floor, oversized book shelves." }, { location: "faovszsc", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_faovszsc.jpg", locMsg: "Little Fine Arts Library, 2nd floor, oversize score shelves." }, { location: "faport", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary2_faport.jpg", locMsg: "Little Fine Arts Library, 2nd floor, portfolios, all the way to the back." }, { location: "faref", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_faref.jpg", locMsg: "Little Fine Arts Library, 1st floor, reference." }, { location: "fares", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, reserves, ask at desk." }, { location: "faspec", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "faspecovsz", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "fawilcox", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_facirc.jpg", locMsg: "Little Fine Arts Library, ask at desk." }, { location: "fagranovel", start_cn: " ", end_cn: " ", mapfile: "LittleLibrary1_fagranovel.jpg", locMsg: "Little Fine Arts Library, 1st floor, graphic novels." }];
    
    var medicalcenter = [{ location: "mcarch", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcav", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcavjr", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcavr4", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcavrs", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcbind", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcbook", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccat", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccd", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccirc", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccl1d", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccl2d", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mccl7d", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcclas", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcclic", start_cn: " ", end_cn: " ", mapfile: "MCL_mcclic.jpg", locMsg: "Williard Medical Education building, Medical Center Library, classics." }, { location: "mcill", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcinab", start_cn: " ", end_cn: " ", mapfile: "MCL_mcinab.jpg", locMsg: "Williard Medical Education building, Medical Center Library, indexes and abstracts." }, { location: "mcinal", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcjour", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcovsz", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcrefb", start_cn: " ", end_cn: " ", mapfile: "MCL_mcrefb.jpg", locMsg: "Williard Medical Education building, Medical Center Library, reference." }, { location: "mcres", start_cn: " ", end_cn: " ", mapfile: "MCL_mcres.jpg", locMsg: "Williard Medical Education building, Medical Center Library, permanent reserves." }, { location: "mcrs", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcstaf", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "mcunbo", start_cn: " ", end_cn: " ", mapfile: "MCL_mcunbo.jpg", locMsg: "Williard Medical Education building, Medical Center Library, unbound journals." }, { location: "medproc", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }, { location: "medproctr", start_cn: " ", end_cn: " ", mapfile: "MCL_ask.jpg", locMsg: "Williard Medical Education building, Medical Center Library, ask at service desk." }];
    
    var scieng = [{ location: "enref", start_cn: " ", end_cn: " ", mapfile: "SciEng3_enref.jpg", locMsg: "King building, Science Engineering Library, 3rd floor engineering reference." }, { location: "enrefind", start_cn: " ", end_cn: " ", mapfile: "SciEng3_enref.jpg", locMsg: "King building, Science Engineering Library, 3rd floor engineering reference." }, { location: "sci", start_cn: " ", end_cn: " ", mapfile: "SciEng3_sci.jpg", locMsg: "King building, Science Engineering Library, 3rd floor books." }, { location: "sci1d", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "sci3d", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "sciarch", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "scicd", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "scicirc", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "scijill", start_cn: " ", end_cn: " ", mapfile: "SciEng4_scijill.jpg", locMsg: "King building, Science Engineering Library, 4th floor, Jillson collection." }, { location: "sciky", start_cn: " ", end_cn: " ", mapfile: "SciEng4_scijill.jpg", locMsg: "King building, Science Engineering Library, 4th floor, Kentucky science collection." }, { location: "scimap", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapbks", start_cn: " ", end_cn: " ", mapfile: "SciEng3_sci.jpg", locMsg: "King building, Science Engineering Library, 3rd floor, map books." }, { location: "scimapdma", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapfich", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapfilm", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapovsz", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimappost", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapsanb", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimaptopo", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scimapvert", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, Maps on 4th floor, but ask at service desk on 2nd floor." }, { location: "scinew", start_cn: " ", end_cn: " ", mapfile: "SciEng3_scinew.jpg", locMsg: "King building, Science Engineering Library, 3rd floor new books." }, { location: "scinkt", start_cn: " ", end_cn: " ", mapfile: "SciEng4_scijill.jpg", locMsg: "King building, Science Engineering Library, 4th floor, non-Kentucky Theses." }, { location: "scirare", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "sciref", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "scires", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }, { location: "sciser", start_cn: " ", end_cn: " ", mapfile: "SciEng4_sciser.jpg", locMsg: "King building, Science Engineering Library, 4th floor, science journals." }, { location: "sciwork", start_cn: " ", end_cn: " ", mapfile: "SciEng2_ask.jpg", locMsg: "King building, Science Engineering Library, 2nd floor, ask at service desk." }];
    
    
    // end map stuff
    })();