import { Component, html } from 'component'
import './application-view.scss'
import { withRouterLinks } from 'nextbone-routing'

const navItems = [
  { title: 'Dashboard', route: 'dashboard', icon: 'tv' },
  { title: 'Notifications', route: 'notifications', icon: 'bell' },
  { title: 'Products', route: 'products', icon: 'shopping-cart' },
  { title: 'Customers', route: 'customers', icon: 'users' },
  { title: 'Reports', route: 'reports', icon: 'chart-bar' },
]

const navbarList = (items, auth) => {
  return html`
    <ul class="nav flex-column" routerlinks>
      ${items.map(({ route, title, icon }) => {
        const disabled = false //! auth.canAccessRoute(route)
        return html`
          <li class="nav-item">
            <a class="nav-link ${disabled ? 'nav-link-disabled' : ''}" route=${route}>
              <fa-icon icon=${icon}></fa-icon>
              <span class="nav-link-text">${title}</span>
            </a>
          </li>
        `
      })}
    </ul>
  `
}

@withRouterLinks
class ApplicationView extends Component {
  static outlet = 'main'

  render() {
    return html`
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 me-0" href="#">Company name</a>
        <input
          class="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#">Sign out</a>
          </li>
        </ul>
      </nav>

      <div class="container-fluid">
        <div class="row">
          <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="sidebar-sticky">
              ${navbarList(navItems, {})}

              <h6
                class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
              >
                <span>Saved reports</span>
                <a class="d-flex align-items-center text-muted" href="#">
                  <fa-icon icon="plus-circle"></fa-icon>
                </a>
              </h6>
              <ul class="nav flex-column mb-2">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <fa-icon icon="file-pdf"></fa-icon>
                    Current month
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <fa-icon icon="file-pdf"></fa-icon>
                    Last quarter
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <fa-icon icon="file-pdf"></fa-icon>
                    Social engagement
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <fa-icon icon="file-pdf"></fa-icon>
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" class="col-md-9 ms-sm-auto col-lg-10 px-md-4"></main>
        </div>
      </div>
    `
  }
}

customElements.define('application-view', ApplicationView)
