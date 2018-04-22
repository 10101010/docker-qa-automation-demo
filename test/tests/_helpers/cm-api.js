const rp = require('request-promise');
const _ = require('lodash');
const querystring = require('querystring')

class CmApiHelper {
    constructor() {
        this.baseUrl = _.trimEnd(browser.baseUrl, '/');

        this.rp = rp.defaults({
            headers: {
                'Accept': 'application/json'
            },
            jar: rp.jar()
        });

        this.filters = {
            byAdvertiserId: 'filters[advertiser.id]='
        };

        this.urls = {
            login: 'ds-api/auth/login',
            advertiser: 'ds-api/advertisers',
            campaignGroup: 'ds-api/campaign-groups',
            campaign: 'ds-api/campaigns',
            adGroup: 'ds-api/adgroups',
            sites: 'ds-api/sites',
            eventTypes: 'ds-api/event-types',
            actions: 'ds-api/actions',
            segments: 'ase-api/audience/advertiser'
        };
    }

    login(login, password) {
        return this._request(this.urls.login, {
            method: 'POST',
            form: {
                email: login,
                password: password
            },
            headers: {
                'X-AUTH_AGENT': 'REST_API'
            }
        })
    }

    _loginAsAdmin() {
        return this.login('admin@dataswitch.com', 'admin');
    }

    createAdvertiser(advertiser) {
        return this._authRequest(this.urls.advertiser, {
            method: 'POST',
            json: advertiser
        })
    }

    deactivateAdvertiser(advertiserId) {
        return this._authRequest(`${this.urls.advertiser}/${advertiserId}/deactivate`, {
            method: 'POST',
            json: advertiserId
        })
    }

    updateAdvertiser(advertiser) {
        return this._authRequest(`${this.urls.advertiser}/${advertiser.id}`, {
            method: 'PUT',
            json: advertiser
        })
    }

    deleteAdvertiser(advertiser) {
        return this._authRequest(`${this.urls.campaignGroup}?${this.filters.byAdvertiserId}${advertiser}`).then((campaignGroups) => {
            let campaignGroupsIds = JSON.parse(campaignGroups).content.map(function(a) {return a.id;});

            console.log('campaign groups: ', campaignGroupsIds);

            let promisesArray = []; 

            campaignGroupsIds.forEach((cgId) => {
                promisesArray.push(this._authRequest(`${this.urls.campaignGroup}/${cgId}`, { method: 'DELETE' })); 
            });

            return Promise.all(promisesArray)
                .then(() => {
                    return this._authRequest(`${this.urls.advertiser}/${advertiser}`, { method: 'DELETE' })
                })

        })
    }

    createAction(action) {
        return this._authRequest(this.urls.actions, {
            method: 'POST',
            json: action
        })
    }

    createCampaignGroup(campaignGroup) {
        return this._authRequest(this.urls.campaignGroup, {
            method: 'POST',
            json: campaignGroup
        })
    }

    createSite(site) {
        return this._authRequest(this.urls.sites, {
            method: 'POST',
            json: site
        })
    }

    createCampaign(campaign) {
        return this._authRequest(this.urls.campaign, {
            method: 'POST',
            json: campaign
        })
    }

    createAdGroup(adGroup) {
        return this._authRequest(this.urls.adGroup, {
            method: 'POST',
            json: adGroup
        })
    }

    //TODO: This is quick stub and should be done properly later
    createSegment(advertiser) {
        var url = `${this.urls.segments}/${advertiser.id}/segments`

        return this._authRequest(url, {
            method: 'POST',
            json: {  
               "name":"_protractor-test-segment",
               "rules":[  ],
               "categoryId":null,
               "categoryName":null,
               "associationId":null,
               "productLineId":null,
               "projectId":null,
               "ownerId":null,
               "source":"MV",
               "usersCount":30,
               "ttl":7776000000,
               "sourceId":"5",
               "supportedChannels":[  
                  "TradeDesk",
                  "Direct"
               ],
               "ruleValue":null,
               "anonymous":true,
               "type":"advertiser",
               "advertiserId":539,
               "_categories":[  
                  {  
                     "id":"protractor-test",
                     "name":"protractor-test"
                  }
               ],
               "description":"{\"sourceId\":\"5\",\"ruleValue\":null,\"supportedChannels\":[\"TradeDesk\",\"Direct\"],\"anonymous\":true}"
            }
        })
    }

    getCollection(name) {
        return this._authRequest(this.urls[name], {}, {size: 9999}).then((response) => { 
            return JSON.parse(response).content;
        })
    }

    _authRequest(relativeUrl, httpOptions = {}, queryParams = null) {
        return this._loginAsAdmin()
            .then(() => {
                return this._request(relativeUrl, httpOptions, queryParams)
            })
    }

    _request(relativeUrl, httpOptions = {}, queryParams = null) {
        let url = `${this.baseUrl}/${relativeUrl}`;

        // console.log("Request to: ", url)

        if (queryParams) {
            url += `?${querystring.stringify(queryParams)}`
        }

        httpOptions = _.defaults(httpOptions, {
            url
        });

        const req = this.rp(httpOptions);

        req.catch((response) => {
            throw new Error(`Failed request to ${httpOptions.url}. Response: ${response.statusCode} - ${response.message}`);
        });

        return req;
    }
}

module.exports = CmApiHelper;
