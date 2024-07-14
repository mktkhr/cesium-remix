import { json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react';

import { createEmptyContact, getContacts } from './data';

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

import type { LinksFunction } from '@remix-run/node';

import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css'; // 必須
import { Entity, Viewer } from 'resium';
import appStylesHref from './app.scss?url';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: appStylesHref }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

export default function App() {
  Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ACCESS_TOKEN;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Viewer full>
          <Entity
            description="test"
            name="tokyo"
            point={{ pixelSize: 10 }}
            position={Cesium.Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
          />
        </Viewer>
        {/* <div id="detail">
          <Outlet />
        </div> */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
