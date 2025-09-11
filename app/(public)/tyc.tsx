// app/(public)/tyc.tsx
import { Body, BodySmallBold } from "@/components/common/Typography";
import { AppLayout } from "@/components/layouts/AppLayout";
import React from "react";

export default function TermsScreen() {

  // Contenido de términos y condiciones
  const termsContent = [
    {
      id: 1,
      text: "Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex nisl laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget rutrum pharetra, lectus nisl posuere risus, vel facilisis nisl tellus ac turpis.",
    },
    {
      id: 2,
      text: "Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex nisl laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget rutrum pharetra, lectus nisl posuere risus, vel facilisis nisl tellus.",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam.",
    },
    {
      id: 4,
      text: "Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt. Aenean arcu metus, bibendum at rhoncus at, volutpat ut lacus. Morbi pellentesque malesuada eros semper ultrices. Vestibulum lobortis enim vel neque auctor, a ultrices ex placerat. Mauris ut lacinia justo, sed suscipit tortor. Nam egestas nulla posuere neque.",
    },
  ];

  return (
    <AppLayout
      title="Términos y condiciones"
      headerVariant="section"
      showNavigation={false}
      scrollable={true}
    >
      {/* Última actualización */}
      <BodySmallBold>
        Última actualización: 14/08/2024
      </BodySmallBold>

      {/* Contenido de términos */}
      {termsContent.map((item) => (
        <Body key={item.id} className="leading-6 text-justify">
          {item.id}. {item.text}
        </Body>
      ))}
    </AppLayout>
  );
}
