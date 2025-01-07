describe('Weather App', () => {
  beforeEach(() => {
    // Stub geolocation API to simulate denied permission
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .callsFake((callback, errorCallback) => {
          errorCallback({ code: 1, message: 'Geolocation permission denied' });
        });
    });
    
    // Reset localStorage before each test
    cy.clearLocalStorage();
    
    // Intercept API calls
    cy.intercept('GET', '**/weather?appid**q=London*', {
      fixture: 'londonWeather.json'
    }).as('getLondonWeather');

    cy.intercept('GET', '**/weather?appid**q=Paris*', {
      fixture: 'parisWeather.json'
    }).as('getParisWeather');

    cy.intercept('GET', '**/weather?appid**q=Tokyo*', {
      fixture: 'tokyoWeather.json'
    }).as('getTokyoWeather');

    cy.intercept('GET', '**/weather?appid**q=Berlin*', {
      fixture: 'berlinWeather.json'
    }).as('getBerlinWeather');

    cy.intercept('GET', '**/weather?appid**q=Oslo*', {
      fixture: 'osloWeather.json'
    }).as('getOsloWeather');

    cy.intercept('GET', '**/geo/1.0/direct?appid**q=Lon*', {
      fixture: 'londonSuggestions.json'
    }).as('getLondonSuggestions');

    cy.intercept('GET', '**/geo/1.0/direct?appid**q=Par*', {
      fixture: 'parisSuggestions.json'
    }).as('getParisSuggestions');

    cy.intercept('GET', '**/geo/1.0/direct?appid**q=Tok*', {
      fixture: 'tokyoSuggestions.json'
    }).as('getTokyoSuggestions');

    cy.intercept('GET', '**/geo/1.0/direct?appid**q=Ber*', {
      fixture: 'berlinSuggestions.json'
    }).as('getBerlinSuggestions');

    // Visit the app
    cy.visit('/');

    // Wait for defatult city weather(Oslo weather to load
    cy.wait('@getOsloWeather');
  });

  describe('Search Functionality', () => {
    it('should show suggestions when typing', () => {
      cy.get('input[placeholder="Search city..."]')
        .type('Lon');

      cy.wait('@getLondonSuggestions');
      
      cy.contains('li', 'London, GB')
        .should('be.visible');
      
      cy.contains('li', 'London, Ontario, CA')
        .should('be.visible');
    });

    it('should search for a city and display weather', () => {
      cy.get('input[placeholder="Search city..."]')
        .type('London');

      cy.wait('@getLondonSuggestions');
      cy.contains('li', 'London, GB').click();

      cy.wait('@getLondonWeather');
      
      // Verify weather display
      cy.contains('18°').should('be.visible');
      cy.contains('London').should('be.visible');
    });
  });

  describe('Recent Searches', () => {
    it('should add searched cities to recent searches', () => {
      // Search for London
      cy.get('input[placeholder="Search city..."]')
        .type('London');
      cy.contains('li', 'London, GB').click();
      cy.wait('@getLondonWeather');

      // Verify recent searches
      cy.contains('h2', 'Recent Searches')
        .should('be.visible');
      cy.get('[data-testid="recent-city"]')
        .should('contain', 'London')
        .and('contain', '18°');
    });

    it('should load weather when clicking on recent search', () => {
      // First search London
      cy.get('input[placeholder="Search city..."]')
        .type('London');
      cy.contains('li', 'London, GB').click();
      cy.wait('@getLondonWeather');

      // Then search Paris
      cy.get('input[placeholder="Search city..."]')
        .clear()
        .type('Paris');
      cy.contains('li', 'Paris, FR').click();
      cy.wait('@getParisWeather');

      // Click London from recent searches
      cy.get('[data-testid="recent-city"]')
        .contains('London')
        .click();

      cy.wait('@getLondonWeather');
      cy.contains('18°').should('be.visible');
      cy.contains('London').should('be.visible');
    });

    it('should limit recent searches to maximum allowed', () => {
      // Search for multiple cities
      const cities = ['London', 'Paris', 'Tokyo', 'Berlin'];
      
      cities.forEach(city => {
        cy.get('input[placeholder="Search city..."]')
          .clear()
          .type(city);
        cy.contains('li', `${city}`).click();
      });

      // Verify only 6 recent searches are shown
      cy.get('[data-testid="recent-city"]')
        .should('have.length', 3);
    });
  });
});
