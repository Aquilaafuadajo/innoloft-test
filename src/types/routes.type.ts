import React from 'react';

export interface RouteInterface {
  path: string;
  component: React.LazyExoticComponent<React.FC> | React.FC;
}
