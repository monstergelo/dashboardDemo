import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes, { blacklist } from '../routes'
import { useApi } from 'src/api/baseApi'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  const {data} = useApi({ url: 'profile'});

  const aunthenticated = true;
  const status = data ? data.status : null;

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => {
                    if (blacklist[status] && blacklist[status][route.path]) return ( 
                      <Redirect to={{pathname: '/dashboard'}} /> 
                    );
                    else if (aunthenticated || route.unprotected) return (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    ); else return (
                      <Redirect to={{pathname: '/login'}} />
                    );
                  }} />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
