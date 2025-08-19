import React, { useState } from 'react';

interface InteractiveCarSVGProps {
  selectedParts: string[];
  onPartClick: (partName: string) => void;
}

const InteractiveCarSVG: React.FC<InteractiveCarSVGProps> = ({ selectedParts, onPartClick }) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getPartStyle = (partName: string) => {
    const isSelected = selectedParts.includes(partName);
    const isHovered = hoveredPart === partName;
    return {
      fill: isSelected ? 'rgba(26, 179, 185, 0.7)' : isHovered ? 'rgba(26, 179, 185, 0.3)' : undefined,
      stroke: isSelected ? 'black' : isHovered ? 'rgb(26, 179, 185)' : undefined,
      strokeWidth: isSelected ? '2px' : isHovered ? '3px' : undefined,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      opacity: 1,
    };
  };

  const handlePartClick = (partName: string) => {
    onPartClick(partName);
  };

  const handlePartHover = (partName: string, event: React.MouseEvent) => {
    setHoveredPart(partName);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handlePartLeave = () => {
    setHoveredPart(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredPart) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
    <svg
      id="CarClaims"
      xmlns="http://www.w3.org/2000/svg"
      width={1000}
      height={1000}
      viewBox="0 0 702.19 883.57"
    >
      <defs>
        <style>
          {`
            .cls-1 {
              stroke: #201600;
            }

            .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-9 {
              fill: #fff;
            }

            .cls-1, .cls-2, .cls-4 {
              stroke-miterlimit: 10;
            }

            .cls-2, .cls-8, .cls-4, .cls-5, .cls-9, .cls-6, .cls-7 {
              stroke: #000;
            }

            .cls-2, .cls-9, .cls-7 {
              stroke-width: 1.85px;
            }

            .cls-8, .cls-5 {
              stroke-width: 3px;
            }

            .cls-8, .cls-5, .cls-9, .cls-6, .cls-7 {
              stroke-linejoin: round;
            }

            .cls-8, .cls-9 {
              fill: none;
            }

            .cls-4, .cls-6 {
              stroke-width: 2px;
            }
          `}
        </style>
      </defs>
      <path
        className="cls-3"
        d="M572.27,630.48c-6.18,2.74-50.65,5.95-62.78-6.96-17.59-9.94-62.87-34.21-62.87-34.21l7.81,106.44s46.01,39.34,62.65,44.72c-.46-13.71-2.34-31.38,0-32.29,7.21-2.72,20.35,26.07,23.09,44.56,4.08,1.97,36.34,15.69,36.34,15.69l3.23,10.65s5.02,7.85,11.71,8.64,11.46,1.36,11.46,1.36l6.44-72.61c-24.59-10.38-49.4-47.84-37.09-86Z"
        style={getPartStyle('Rechte Fahrzeugseite')}
        onClick={() => handlePartClick('Rechte Fahrzeugseite')}
        onMouseEnter={(e) => handlePartHover('Rechte Fahrzeugseite', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-3"
        d="M129.39,630.48c6.18,2.74,50.65,5.95,62.78-6.96,17.59-9.94,62.87-34.21,62.87-34.21l-7.81,106.44s-40.06,34.31-62.65,44.72c.46-13.71,2.34-31.38,0-32.29-7.21-2.72-19.13,25.47-23.09,44.56-.92,4.43-36.34,15.69-36.34,15.69l-3.23,10.65s-5.02,7.85-11.71,8.64-11.46,1.36-11.46,1.36l-6.44-72.61c24.59-10.38,49.4-47.84,37.09-86Z"
        style={getPartStyle('Linke Fahrzeugseite')}
        onClick={() => handlePartClick('Linke Fahrzeugseite')}
        onMouseEnter={(e) => handlePartHover('Linke Fahrzeugseite', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-3"
        d="M602.91,789.09s6.7-74.78,6.66-80.9c18.61,7.51,27.67,10.67,35.43,9.42-.33,5.75-3.37,58.11-3.37,58.11-19.13,13.75-38.73,13.37-38.73,13.37Z"
      />
      <path
        className="cls-3"
        d="M99.27,789.09s-6.7-74.78-6.66-80.9c-18.61,7.51-27.67,10.67-35.43,9.42.33,5.75,3.37,58.11,3.37,58.11,19.13,13.75,38.73,13.37,38.73,13.37Z"
      />
      <path
        className="cls-3"
        d="M562,115.16l-6.69-16.56s29.12,3.82,35.32,2.57,13.37-9.22,12.67-15.32c7.5-.19,36.74.82,39.63,4.01-.73,4.74-3.28,63.92-3.28,63.92-12.89-3.54-49.37,14.4-52.75,23.06l-22.03-27.35s3.27-37.54,2.95-41.68c-.23-3.1-5.84,7.35-5.84,7.35Z"
      />
      <path
        className="cls-3"
        d="M139.39,115.16l6.69-16.56s-29.12,3.82-35.32,2.57-13.37-9.22-12.67-15.32c-7.5-.19-36.74.82-39.63,4.01.73,4.74,3.28,63.92,3.28,63.92,12.89-3.54,49.37,14.4,52.75,23.06l22.03-27.35s-3.27-37.54-2.95-41.68c.23-3.1,5.84,7.35,5.84,7.35Z"
      />
      <path
        className="cls-3"
        d="M564.89,149.49l22.03,27.35s-22.66,22.84-16.51,64.86c12.47,51.78,64.17,61.4,57.96,60.68-47.71-5.6-79.31-4.36-95.91,3.79,2.22-30.7,5.04-111.05,14.29-144.4,10.63-7.65,18.14-12.28,18.14-12.28Z"
        style={getPartStyle('Kotflügel rechts')}
        onClick={() => handlePartClick('Kotflügel rechts')}
        onMouseEnter={(e) => handlePartHover('Kotflügel rechts', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-3"
        d="M137.06,149.49l-22.03,27.35s22.66,22.84,16.51,64.86c-12.47,51.78-64.17,61.4-57.96,60.68,47.71-5.6,79.31-4.36,95.91,3.79-2.22-30.7-5.04-111.05-14.29-144.4-10.63-7.65-18.14-12.28-18.14-12.28Z"
        style={getPartStyle('Kotflügel links')}
        onClick={() => handlePartClick('Kotflügel links')}
        onMouseEnter={(e) => handlePartHover('Kotflügel links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-3"
        d="M509.49,623.53l10.81-149.32s53.86-13.57,120.25-5.15c-.23,15.52-1.61,110.76-1.61,110.76-31.76,1.86-56.81,21-66.67,50.67-13.85,1.43-48.74,6.51-62.78-6.96Z"
        style={getPartStyle('Hintere rechte Tür')}
        onClick={() => handlePartClick('Hintere rechte Tür')}
        onMouseEnter={(e) => handlePartHover('Hintere rechte Tür', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-3"
        d="M192.88,623.53l-10.81-149.32s-53.86-13.57-120.25-5.15c.23,15.52,1.61,110.76,1.61,110.76,31.76,1.86,56.81,21,66.67,50.67,13.85,1.43,48.74,6.51,62.78-6.96Z"
        style={getPartStyle('Hintere linke Tür')}
        onClick={() => handlePartClick('Hintere linke Tür')}
        onMouseEnter={(e) => handlePartHover('Hintere linke Tür', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-3"
        d="M520.3,474.21l12.16-168.05s46.91-16.05,110.48-1.29c-.33,10.77-2.38,164.18-2.38,164.18,0,0-71.91-6.1-120.25,5.15Z"
        style={getPartStyle('Beifahrertür (vorne rechts)')}
        onClick={() => handlePartClick('Beifahrertür (vorne rechts)')}
        onMouseEnter={(e) => handlePartHover('Beifahrertür (vorne rechts)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-3"
        d="M181.79,474.21l-12.16-168.05s-46.91-16.05-110.48-1.29c.33,10.77,2.38,164.18,2.38,164.18,0,0,71.91-6.1,120.25,5.15Z"
        style={getPartStyle('Fahrertür (vorne links)')}
        onClick={() => handlePartClick('Fahrertür (vorne links)')}
        onMouseEnter={(e) => handlePartHover('Fahrertür (vorne links)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-3"
        d="M249.13,378.21c70.74-12.46,185.92-4.61,204.26,0-12.37,56.04-10.37,219.97-8.57,322.01,0,0-110.06,13.24-187.12,0,6.08-29.2-1.93-293.25-8.57-322.01Z"
        style={getPartStyle('Dach')}
        onClick={() => handlePartClick('Dach')}
        onMouseEnter={(e) => handlePartHover('Dach', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-3"
        d="M232.85,268.38l-8.21-15.35s14.58-106.37,44.27-141.15c12.61-13.72,46.11-11.57,46.11-11.57l88.66.86s23.38-2.11,32.13,13.99,38.22,68.59,42.09,137.87c-1.53,2.86-9.52,15.35-9.52,15.35,0,0,3.88-27.38-33.41-43.71s-144.98-19.97-183.8,9.23c-12.21,8.14-18.32,34.48-18.32,34.48Z"
        style={getPartStyle('Motorhaube')}
        onClick={() => handlePartClick('Motorhaube')}
        onMouseEnter={(e) => handlePartHover('Motorhaube', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <polygon
        className="cls-1"
        points="653.43 586.22 638.94 585.71 642.94 290.97 657.29 290.97 653.43 586.22"
        style={getPartStyle('Schweller rechts')}
        onClick={() => handlePartClick('Schweller rechts')}
        onMouseEnter={(e) => handlePartHover('Schweller rechts', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-8"
        d="M351.44,759.87c11.2.12,23.18-.11,35.83-.84,5.52-.32,10.9-.72,16.14-1.19,18.06-1.62,33.4-13.51,38.64-30.11.04-.14.09-.28.13-.42,3.49-11.31,3.27-21.07,2.64-27.09-1.72-65.69-3.39-146.35.73-219.6,2.03-36.15,4.78-71.3,8.13-105.38,3.04-16.91,6.5-39.63,9.01-57.67,2.22-15.94,4.1-31.52,5.68-46.74h0c3.17-5.93,6.35-11.87,9.52-17.8-.4-4.29-.9-8.69-1.51-13.2,0,0-1.33-9.84-3.36-20.18-8.32-42.27-20.23-70.57-20.23-70.57-4.06-9.66-10.13-22.58-19-37.32l-.16.12c-.85-.98-1.9-2.05-3.19-3.14-.02-.01-.04-.03-.05-.04-2.53-2.12-5.62-3.55-8.92-4.28-4.19-.92-8.56-1.9-13.17-2.45-22.16-2.62-57.2-2.62-57.2-2.62h.35s-35.04,0-57.2,2.62c-4.61.55-8.98,1.53-13.17,2.45-3.31.73-6.4,2.16-8.92,4.28-.02.01-.04.03-.05.04-1.29,1.09-2.34,2.17-3.19,3.14l-.16-.12c-8.87,14.73-14.94,27.66-19,37.32,0,0-11.91,28.3-20.23,70.57-2.04,10.35-3.36,20.18-3.36,20.18-.61,4.5-1.11,8.9-1.51,13.2,3.17,5.93,6.35,11.87,9.52,17.8h0c1.58,15.22,3.46,30.8,5.68,46.74,2.52,18.04,5.97,40.76,9.01,57.67,3.34,34.08,6.1,69.22,8.13,105.38,4.12,73.25,2.45,153.92.73,219.6-.63,6.02-.85,15.78,2.64,27.09.04.14.09.28.13.42,5.24,16.6,20.59,28.49,38.65,30.11,5.24.47,10.62.87,16.14,1.19,12.65.74,24.63.97,35.83.84"
        style={{pointerEvents: 'none'}}
      />
      <polygon
        className="cls-3"
        points="49.1 586.22 63.58 585.71 59.58 290.97 45.24 290.97 49.1 586.22"
        style={getPartStyle('Schweller links')}
        onClick={() => handlePartClick('Schweller links')}
        onMouseEnter={(e) => handlePartHover('Schweller links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-5"
        d="M227.2,94.27l-22.31-13.72-.49-.71c.88-16.75,2.39-34.24,4.69-52.37.84-6.62,1.76-13.12,2.75-19.49.58-3.73,3.79-6.48,7.56-6.48h37.63c1.99,0,3.97.34,5.86,1l3.69,1.29c1.25.44,2.57.66,3.9.65,26.98-.14,53.97-.27,80.95-.41h.21c26.98.14,53.97.27,80.95.41,1.33,0,2.65-.21,3.9-.65l3.69-1.29c1.88-.66,3.86-1,5.86-.99h37.63c3.77,0,6.98,2.75,7.56,6.48.99,6.37,1.91,12.87,2.75,19.49,2.34,18.39,3.86,36.11,4.73,53.08h-.1s-22.31,13.72-22.31,13.72"
        style={getPartStyle('Vorderer Stoßfänger')}
        onClick={() => handlePartClick('Vorderer Stoßfänger')}
        onMouseEnter={(e) => handlePartHover('Vorderer Stoßfänger', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-8" d="M96.98,789.36c4.97-.59,9.95-1.18,14.92-1.77,2.71-.32,5.18-1.7,6.87-3.85l3.68-4.66c11.65-.75,23.37-.78,34.95-2.25,8.24-1.04,16.35-2.9,24.48-4.59,2.59-.54,4.9-1.89,6.64-3.81q-.26.17,0,0c.74-.82,1.4-1.73,1.91-2.74l6.83-13.57,31.72-24.7c3.14-1.2,6.28-2.41,9.42-3.61,2.44-1,4.89-2,7.33-3,2.22-24.35,4.26-49.12,6.09-74.31,1.75-24.09,3.25-47.84,4.52-71.23,0,0,3.5-67.51-.84-133.49-.67-10.2-1.73-18.26-2.11-21.05-2.18-16.06-5.3-29.25-7.86-38.6-2.43,1.22-4.87,2.43-7.3,3.65-8.05-20.02-18.11-41.89-30.74-64.85-9.6-17.45-19.43-33.26-29.06-47.44-.14-9.01-.29-18.02-.43-27.03-.02-.02-.02-.04-.02-.04,0,0,0,.01.02.04-.14-8.49-.27-16.97-.41-25.46-2.95-21.13-7.38-44.55-14.04-69.62-5.09-19.17-10.8-36.79-16.7-52.78-12.02,1.69-21.86,2.31-29.06,2.53-3.94.12-7.86.14-11.58-2.32-5.41-3.58-6.9-10.1-7.36-12.97-19.35-1.08-35.12,2.63-44.64,5.6-3.79,23.3-7.58,46.6-11.37,69.9,26.02-5.91,52.75,3.15,68.64,23.16,13.44,16.93,17.57,39.75,11.37,59.37-9.32,29.51-41.4,50.03-77.9,47.16,1.26,98.39,2.53,196.79,3.79,295.18,38.9-5.47,73.88,22.73,77.48,58.53,3.77,37.48-27.87,73.23-69.06,72.85,1.12,19.37,2.25,38.74,3.37,58.11,3.72,2.58,8.4,5.38,14.04,7.86,6.71,2.96,12.93,4.65,18.08,5.64,1.42.27,2.88.31,4.32.14Z"
      />
      <path className="cls-7" d="M106.24,98.81c3.72,2.46,7.64,2.44,11.58,2.32,7.2-.22,17.03-.83,29.06-2.53-8.41-4.19-20.03-8.79-34.39-11.23-4.7-.8-9.24-1.28-13.61-1.53.46,2.87,1.95,9.39,7.36,12.97Z"
      />
      <path className="cls-4" d="M207.51,320.94c12.63,22.96,22.69,44.83,30.74,64.85,2.43-1.22,4.87-2.43,7.3-3.65-8.02-21.98-18.11-46.12-30.88-71.59-12.01-23.96-24.57-45.39-36.65-64.09.14,9.01.29,18.02.43,27.03,9.62,14.18,19.46,29.99,29.06,47.44Z"
        style={getPartStyle('Windschutzscheibe')}
        onClick={() => handlePartClick('Windschutzscheibe')}
        onMouseEnter={(e) => handlePartHover('Windschutzscheibe', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M197.26,752.13l-6.83,13.57c-.51,1.01-1.16,1.92-1.91,2.74,5.15-3.34,10.6-7.04,16.15-11.04,3.84-2.77,10-7.24,16.73-12.85,6.56-5.46,15.07-13.15,24.34-23.41-5.59,2.09-11.17,4.19-16.76,6.28l-31.72,24.7Z"
        style={getPartStyle('Heckscheibe')}
        onClick={() => handlePartClick('Heckscheibe')}
        onMouseEnter={(e) => handlePartHover('Heckscheibe', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-7" d="M167.5,275.46l26.88,371.41c.59,8.14,4.09,15.8,9.86,21.58l17.28,17.28c3.3,3.3,8.95,1.46,9.69-3.15,7.74-48.45,11.26-89.99,12.92-122.04,6.17-118.68-10.2-160.95-14.88-172.23-4.24-10.23-13.71-30.81-25.83-53.34-13.56-25.21-26.41-45.39-35.93-59.51Z"
      />
      <path className="cls-4" d="M240.33,468.39c-2.1-28.32-6.54-57.66-15.38-78.43-4.49-10.55-14.03-30.67-26.14-52.65-8.14-14.79-16.87-29.36-26.06-43.51l13.55,164.86c15.42,2.74,40.69,7.31,54.03,9.74Z"
        style={getPartStyle('Seitenscheibe (vorne links)')}
        onClick={() => handlePartClick('Seitenscheibe (vorne links)')}
        onMouseEnter={(e) => handlePartHover('Seitenscheibe (vorne links)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M225.86,682.58c.37-.12.58-.37.65-.75,4.35-27.22,7.73-54.7,10.12-82.09l-39.37,20.69,1.89,26.09c.51,7,3.52,13.58,8.48,18.54l17.28,17.28c.27.27.59.35.95.23Z"
        style={getPartStyle('Seitenscheibe (hinten links)')}
        onClick={() => handlePartClick('Seitenscheibe (hinten links)')}
        onMouseEnter={(e) => handlePartHover('Seitenscheibe (hinten links)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M237.72,586.17c.65-8.65,1.21-17.28,1.65-25.88.91-17.43,1.37-34.13,1.37-49.64,0-6.01-.07-12.38-.25-18.97l-52.66-1.46,8.23,113.69,41.66-17.74Z"
        style={getPartStyle('Seitenscheibe (hinten links)')}
        onClick={() => handlePartClick('Seitenscheibe (hinten links)')}
        onMouseEnter={(e) => handlePartHover('Seitenscheibe (hinten links)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-2" d="M178.93,321.48l-5.8,8.58c-2.84-3.51-5.69-7.02-8.53-10.53-.05-.26-.5-2.71,1.26-4.63,1.49-1.62,3.47-1.68,3.81-1.68l9.26,8.26"
        style={getPartStyle('Linker Außenspiegel')}
        onClick={() => handlePartClick('Linker Außenspiegel')}
        onMouseEnter={(e) => handlePartHover('Linker Außenspiegel', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-7" d="M191.26,343.16c.35-2.32.29-5.02.23-7.34-.15-6.28-.31-13.08-4.29-15.65-3.07-1.99-6.98-.54-9.28,1.32-4.65,3.74-6.11,11.79-4.1,17.5,5.85,1.13,11.66,2.51,17.44,4.18Z"
        style={getPartStyle('Linker Außenspiegel')}
        onClick={() => handlePartClick('Linker Außenspiegel')}
        onMouseEnter={(e) => handlePartHover('Linker Außenspiegel', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-9" d="M244.86,479.62l-62.97-5.41c-4.51-1.2-11.04-2.79-19.02-4.21,0,0-13.74-2.45-29.9-3.37-32.53-1.86-69.14,2.19-71.34,2.42"
      />
      <path className="cls-7" d="M169.73,306.16c-3.01-1.04-7.38-2.44-12.75-3.75-10.41-2.55-24.79-4.82-50.95-3.37-12.32.68-28.21,2.25-46.78,5.83"
      />
      <path className="cls-7" d="M155.43,161.76c2.08,10.63,3.97,21.67,5.61,33.13,4.21,29.39,6.14,56.96,6.58,82.26"
      />
      <path className="cls-4" d="M155.12,162.31c.03-.17.04-.33.01-.5-1.2-8.11-3.33-17.93-7.18-28.7-3.53-9.88-7.69-18.26-11.68-25.1-.76-1.31-2.77-.75-2.73.76.17,6.51.55,13.28,1.19,20.29,2.13,23.27,6.67,43.94,11.98,61.62.44,1.46,2.54,1.35,2.83-.15,1.86-9.4,3.71-18.81,5.57-28.21Z"
        style={getPartStyle('Frontscheinwerfer links')}
        onClick={() => handlePartClick('Frontscheinwerfer links')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-7" d="M162.01,752.74c-12.45,6.1-24.63,11.28-36.34,15.69-1.08,3.55-2.15,7.1-3.23,10.65"
      />
      <path className="cls-9" d="M247.75,695.76c-5.58,4.89-11.46,9.75-17.64,14.55-14.98,11.63-30.09,21.6-45,30.17"
      />
      <path className="cls-7" d="M87.58,106.78l5.37,22.75c.87,3.7-1.31,7.44-5,8.56l-5.68,1.73c-4.49,1.37-9.12-1.71-9.51-6.32l-2.01-23.69c-.28-3.3,1.75-6.37,4.93-7.45.75-.25,1.49-.51,2.24-.76.03,0,.05-.02.08-.03,4.13-1.4,8.59,1.02,9.58,5.21Z"
        style={getPartStyle('Frontscheinwerfer links')}
        onClick={() => handlePartClick('Frontscheinwerfer links')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M83.07,134.11c4.01,0,7.26-1.39,7.26-3.1s-3.25-3.1-7.26-3.1-7.26,1.39-7.26,3.1,3.25,3.1,7.26,3.1Z"
        style={getPartStyle('Frontscheinwerfer links')}
        onClick={() => handlePartClick('Frontscheinwerfer links')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <line className="cls-9" x1="241.69" y1="596.61" x2="236.62" y2="599.74"
      />
      <path className="cls-9" d="M59.24,304.32c1.33,91.83,2.67,183.67,4,275.5,34.5,1.55,63.24,26.84,68.89,59.89,5.28,30.85-10.63,62.24-39.3,76.78,2.15,24.2,4.3,48.4,6.44,72.61"
      />
      <path className="cls-9" d="M59.77,89.85l2.75,63.92c5.09.04,32.51.78,52.55,22.71,15.39,16.83,17.4,36.26,18,43,.45,5.04,1.77,25.5-10.33,46-19.88,33.68-58.81,38.35-63.5,38.83v-13.34"
      />
      <path className="cls-7" d="M151.54,453.58c1.58-.03,2.74-7.65,2.59-17.02-.16-9.37-1.57-16.95-3.15-16.92-1.58.03-2.74,7.65-2.59,17.02.16,9.37,1.57,16.95,3.15,16.92Z"
        style={getPartStyle('Griffschalen (vorne links)')}
        onClick={() => handlePartClick('Griffschalen (vorne links)')}
        onMouseEnter={(e) => handlePartHover('Griffschalen (vorne links)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-7" d="M162.85,628.88c1.58-.03,2.74-7.65,2.59-17.02-.16-9.37-1.57-16.95-3.15-16.92-1.58.03-2.74,7.65-2.59,17.02.16,9.37,1.57,16.95,3.15,16.92Z"
        style={getPartStyle('Griffschalen (hinten links)')}
        onClick={() => handlePartClick('Griffschalen (hinten links)')}
        onMouseEnter={(e) => handlePartHover('Griffschalen (hinten links)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <line className="cls-7" x1="140.18" y1="115.16" x2="146.87" y2="98.6"
      />
      <path
        className="cls-5"
        d="M54.59,278.03c-29.32,0-53.09-24.35-53.09-54.39s23.77-54.39,53.09-54.39c29.32,0,53.09,24.35,53.09,54.39,0,30.04-23.77,54.39-53.09,54.39Z"
        style={getPartStyle('Vorderrad links')}
        onClick={() => handlePartClick('Vorderrad links')}
        onMouseEnter={(e) => handlePartHover('Vorderrad links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <ellipse className="cls-2" cx="54.59" cy="223.64" rx="40.31" ry="41.3"
      />
      <g>
        <ellipse
          className="cls-5"
          cx="54.59"
          cy="651.07"
          rx="53.09"
          ry="54.39"
          style={getPartStyle('Hinterrad links')}
          onClick={() => handlePartClick('Hinterrad links')}
          onMouseEnter={(e) => handlePartHover('Hinterrad links', e)}
          onMouseLeave={handlePartLeave}
          onMouseMove={handleMouseMove}
        />
        <ellipse className="cls-2" cx="54.59" cy="651.07" rx="40.31" ry="41.3"
        />
      </g>
      <path className="cls-9" d="M197.26,620.43l-4.56,3.09c-2.8,2.07-7.11,4.81-12.84,6.77-4.39,1.5-9.61,2.55-23.3,2.25-6.88-.15-15.95-.65-26.64-2.06"
      />
      <line className="cls-7" x1="137.29" y1="149.49" x2="115.27" y2="176.83"
      />
      <path className="cls-4" d="M170.22,726l-13.32,43.4c3.97.88,8.95,1.62,14.82,1.68,4.59.05,8.77-.32,12.38-.84l2.01-59.55c.07-2.2-2.58-3.35-4.13-1.79l-3.71,3.71c-3.73,3.74-6.5,8.34-8.05,13.39Z"
        style={getPartStyle('Heckscheinwerfer links')}
        onClick={() => handlePartClick('Heckscheinwerfer links')}
        onMouseEnter={(e) => handlePartHover('Heckscheinwerfer links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-5"
        d="M478.49,751.57c2.08,1.75,4.29,3.82,6.5,6.25,3.64,4,6.39,7.97,8.46,11.51.66,1.13,1.13,2.34,1.4,3.62.69,3.31,1.32,6.82,1.85,10.52.65,4.48,1.09,8.73,1.37,12.71.02.32.03.64.03.96-.04,15.03-.95,31.84-3.37,50.05-.6,4.51-1.26,8.91-1.98,13.19-2.07,12.33-12.78,21.34-25.29,21.34h-116.38s-116.38,0-116.38,0c-12.5,0-23.22-9.01-25.29-21.34-.72-4.28-1.38-8.68-1.98-13.19-2.41-18.21-3.33-35.02-3.37-50.05,0-.32,0-.64.03-.96.28-3.99.72-8.24,1.37-12.72.54-3.69,1.16-7.2,1.85-10.5.27-1.28.74-2.5,1.4-3.62,2.08-3.5,4.98-7.55,9.01-11.52,2.23-2.2,4.44-4.01,6.5-5.5l45.8,7.56h162.09l46.36-8.31Z"
        style={getPartStyle('Kofferraum/Heckklappe')}
        onClick={() => handlePartClick('Kofferraum/Heckklappe')}
        onMouseEnter={(e) => handlePartHover('Kofferraum/Heckklappe', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-7"
        d="M456.06,783.12c0,6.11-.23,14.39-.77,21.32-.66,8.43-1.71,16.24-2.95,23.37h-202.52c-1.24-7.13-2.29-14.94-2.95-23.37-.54-6.93-.77-15.21-.77-21.32l10.45.33,13.47-23.58h162.09l13.47,23.58,10.45-.33Z"
        style={getPartStyle('Kofferraum/Heckklappe')}
        onClick={() => handlePartClick('Kofferraum/Heckklappe')}
        onMouseEnter={(e) => handlePartHover('Kofferraum/Heckklappe', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-7" d="M351.09,860.23h-49.64c-16.6,0-32.52,6.61-44.24,18.36l-3.41,3.42c-49.25,5.82-45.79-30.67-45.79-30.67l33.52-7.68c8.15-1.87,16.48-2.81,24.84-2.81h169.42c8.36,0,16.69.94,24.84,2.81l33.52,7.68c-2.08,11.94,2.2,33.06-45.79,30.67l-3.41-3.42c-11.72-11.76-27.64-18.36-44.24-18.36h-49.64"
        style={getPartStyle('Hinterer Stoßfänger')}
        onClick={() => handlePartClick('Hinterer Stoßfänger')}
        onMouseEnter={(e) => handlePartHover('Hinterer Stoßfänger', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <polyline className="cls-9" points="432.14 759.87 351.09 759.87 270.04 759.87"
      />
      <path className="cls-4" d="M445.14,854.34l11.76,8.18c1.67,1.16,3.65,1.78,5.68,1.78h22.41c-2.74-2.64-7.47-6.5-14.32-9.03-11.47-4.22-21.61-2.01-25.53-.93Z"
        style={getPartStyle('Heckscheinwerfer rechts')}
        onClick={() => handlePartClick('Heckscheinwerfer rechts')}
        onMouseEnter={(e) => handlePartHover('Heckscheinwerfer rechts', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-4"
        d="M434.97,224.67c-.14-.05-.28-.1-.42-.14-32.57-10.96-61.96-12.77-83.11-12.77h-.35c-21.15,0-50.54,1.81-83.11,12.77-.14.05-.28.09-.42.14-21.84,7.39-35.44,28.21-33.16,50.25,1.58,15.22,3.46,30.8,5.68,46.74,2.52,18.04,5.33,35.53,8.37,52.44.48,2.67,3.11,4.47,5.91,4.05,11.56-1.74,23.77-3.23,36.59-4.38,21.54-1.93,41.68-2.58,60.13-2.42h.35c18.45-.16,38.58.5,60.13,2.42,12.82,1.15,25.04,2.64,36.59,4.38,2.8.42,5.43-1.38,5.91-4.05,3.04-16.91,5.86-34.4,8.37-52.44,2.22-15.94,4.1-31.52,5.68-46.74,2.29-22.04-11.31-42.86-33.16-50.25Z"
        style={getPartStyle('Windschutzscheibe')}
        onClick={() => handlePartClick('Windschutzscheibe')}
        onMouseEnter={(e) => handlePartHover('Windschutzscheibe', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-4"
        d="M350.49,706.07c6.09-.08,16.33.09,26.8-.25,15.23-.5,26.88-1.52,38-2.5,7.57-.67,17.63-1.66,29.54-3.1.63,6.02.85,15.78-2.64,27.09-.04.14-.09.28-.13.42-5.24,16.6-20.59,28.49-38.64,30.11-5.24.47-10.62.87-16.14,1.19-12.65.74-24.63.97-35.83.84h-.35c-11.2.12-23.18-.11-35.83-.84-5.52-.32-10.9-.72-16.14-1.19-18.06-1.62-33.4-13.51-38.65-30.11-.04-.14-.09-.28-.13-.42-3.49-11.31-3.27-21.07-2.64-27.09,11.91,1.44,21.97,2.43,29.54,3.1,11.12.98,22.77,2,38,2.5,10.46.34,19.16.33,25.25.25Z"
        style={getPartStyle('Heckscheibe')}
        onClick={() => handlePartClick('Heckscheibe')}
        onMouseEnter={(e) => handlePartHover('Heckscheibe', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-7"
        d="M351.64,15.66c-26.71,0-53.42.8-80.12,2.39-2.86.17-4.63,4.42-3.17,7.58,1.15,2.49,2.3,4.99,3.46,7.48.67,1.44,1.87,2.28,3.17,2.2,25.54-1.49,51.1-2.25,76.66-2.28,25.56.03,51.12.79,76.66,2.28,1.3.08,2.5-.76,3.17-2.2,1.15-2.5,2.3-4.99,3.46-7.48,1.46-3.17-.31-7.41-3.17-7.58-26.69-1.59-53.4-2.39-80.12-2.39Z"
        style={getPartStyle('Kühlergrill')}
        onClick={() => handlePartClick('Kühlergrill')}
        onMouseEnter={(e) => handlePartHover('Kühlergrill', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-7"
        d="M351.44,52.42c-20.22,0-44.2,1.01-70.28,6.39-3.52.73-6.95,1.5-10.28,2.31-4.34,1.05-6.12,5.27-3.47,8.24,2.07,2.32,4.56,4.78,7.56,7.24.07.06.14.11.21.17,8.93,7.29,21.07,11.41,33.76,11.72.93.02,1.87.04,2.81.06,13.7.29,26.94,0,39.7,0s26,.29,39.7,0c.94-.02,1.88-.04,2.81-.06,12.68-.31,24.82-4.43,33.76-11.72.07-.06.14-.11.21-.17,3-2.46,5.49-4.92,7.56-7.24,2.65-2.97.87-7.18-3.47-8.24-3.33-.81-6.76-1.58-10.28-2.31-26.08-5.38-50.06-6.39-70.28-6.39Z"
        style={getPartStyle('Kühlergrill')}
        onClick={() => handlePartClick('Kühlergrill')}
        onMouseEnter={(e) => handlePartHover('Kühlergrill', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M482.61,110.88c-7.38-.46-19.2-1.52-21.73-1.75-.34-.03-.67-.12-.98-.27l-26.09-12.46c-2.06-.98-2.41-4.44-.57-5.66l4.15-2.74c.09-.06.18-.11.28-.16,2.39-1.11,18.72-8.1,35.25,3.79,5.88,4.23,9.9,9.52,12.52,13.93,1.48,2.5-.13,5.49-2.83,5.32Z"
        style={getPartStyle('Frontscheinwerfer rechs')}
        onClick={() => handlePartClick('Frontscheinwerfer rechs')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer rechs', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M220.45,110.88c7.38-.46,19.2-1.52,21.73-1.75.34-.03.67-.12.98-.27l26.09-12.46c2.06-.98,2.41-4.44.57-5.66l-4.15-2.74c-.09-.06-.18-.11-.28-.16-2.39-1.11-18.72-8.1-35.25,3.79-5.89,4.23-9.9,9.52-12.52,13.93-1.48,2.5.13,5.49,2.83,5.32Z"
        style={getPartStyle('Frontscheinwerfer links')}
        onClick={() => handlePartClick('Frontscheinwerfer links')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-7" d="M439.87,35.99l.12-.27c.8-1.84,2.29-3.11,3.99-3.36l28.47-4.13c6.87-1,12.39,4.86,9.79,11.11l-3.45,8.27c-1.66,3.98-6.24,5.86-10.52,4.62l-25.15-7.26c-3.23-.93-4.79-5.42-3.24-8.99Z"
        style={getPartStyle('Frontscheinwerfer rechs')}
        onClick={() => handlePartClick('Frontscheinwerfer rechs')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer rechs', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M460.97,40.66c0,4.46,3.06,8.32,7.1,8.65,4.39.36,8.22-3.51,8.22-8.66s-3.83-9.02-8.22-8.65c-4.05.34-7.1,4.21-7.1,8.66Z"
        style={getPartStyle('Frontscheinwerfer rechs')}
        onClick={() => handlePartClick('Frontscheinwerfer rechs')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer rechs', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-7" d="M263.19,35.99l-.12-.27c-.8-1.84-2.29-3.11-3.99-3.36l-28.47-4.13c-6.87-1-12.39,4.86-9.79,11.11l3.45,8.27c1.66,3.98,6.24,5.86,10.52,4.62l25.15-7.26c3.23-.93,4.79-5.42,3.24-8.99Z"
        style={getPartStyle('Frontscheinwerfer links')}
        onClick={() => handlePartClick('Frontscheinwerfer links')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M242.1,40.66c0,4.46-3.06,8.32-7.1,8.65-4.39.36-8.22-3.51-8.22-8.66s3.83-9.02,8.22-8.65c4.05.34,7.1,4.21,7.1,8.66Z"
        style={getPartStyle('Frontscheinwerfer links')}
        onClick={() => handlePartClick('Frontscheinwerfer links')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path
        className="cls-9"
        d="M270.9,93.43c5.67,1.6,13.09,3.34,21.87,4.51,5.33.7,11.55,1.25,35.79,1.4,6.37.04,14.09.06,22.88,0,8.79.06,16.7.04,23.08,0,24.24-.16,30.46-.7,35.79-1.4,8.78-1.16,16.2-2.91,21.87-4.51"
        style={getPartStyle('Vorderer Stoßfänger')}
        onClick={() => handlePartClick('Vorderer Stoßfänger')}
        onMouseEnter={(e) => handlePartHover('Vorderer Stoßfänger', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <line className="cls-6" x1="63.11" y1="579.07" x2="63.11" y2="585.07"
      />
      <path className="cls-8" d="M605.21,789.36c-4.97-.59-9.95-1.18-14.92-1.77-2.71-.32-5.18-1.7-6.87-3.85l-3.68-4.66c-11.65-.75-23.37-.78-34.95-2.25-8.24-1.04-16.35-2.9-24.48-4.59-2.59-.54-4.9-1.89-6.64-3.81q.26.17,0,0c-.74-.82-1.4-1.73-1.91-2.74l-6.83-13.57-31.72-24.7c-3.14-1.2-6.28-2.41-9.42-3.61-2.44-1-4.89-2-7.33-3-2.22-24.35-4.26-49.12-6.09-74.31-1.75-24.09-3.25-47.84-4.52-71.23,0,0-3.5-67.51.84-133.49.67-10.2,1.73-18.26,2.11-21.05,2.18-16.06,5.3-29.25,7.86-38.6,2.43,1.22,4.87,2.43,7.3,3.65,8.05-20.02,18.11-41.89,30.74-64.85,9.6-17.45,19.43-33.26,29.06-47.44.14-9.01.29-18.02.43-27.03.02-.02.02-.04.02-.04,0,0,0,.01-.02.04.14-8.49.27-16.97.41-25.46,2.95-21.13,7.38-44.55,14.04-69.62,5.09-19.17,10.8-36.79,16.7-52.78,12.02,1.69,21.86,2.31,29.06,2.53,3.94.12,7.86.14,11.58-2.32,5.41-3.58,6.9-10.1,7.36-12.97,19.35-1.08,35.12,2.63,44.64,5.6,3.79,23.3,7.58,46.6,11.37,69.9-26.02-5.91-52.75,3.15-68.64,23.16-13.44,16.93-17.57,39.75-11.37,59.37,9.32,29.51,41.4,50.03,77.9,47.16-1.26,98.39-2.53,196.79-3.79,295.18-38.9-5.47-73.88,22.73-77.48,58.53-3.77,37.48,27.87,73.23,69.06,72.85-1.12,19.37-2.25,38.74-3.37,58.11-3.72,2.58-8.4,5.38-14.04,7.86-6.71,2.96-12.93,4.65-18.08,5.64-1.42.27-2.88.31-4.32.14Z"
      />
      <path className="cls-7" d="M595.95,98.81c-3.72,2.46-7.64,2.44-11.58,2.32-7.2-.22-17.03-.83-29.06-2.53,8.41-4.19,20.03-8.79,34.39-11.23,4.7-.8,9.24-1.28,13.61-1.53-.46,2.87-1.95,9.39-7.36,12.97Z"
      />
      <path className="cls-4" d="M494.68,320.94c-12.63,22.96-22.69,44.83-30.74,64.85-2.43-1.22-4.87-2.43-7.3-3.65,8.02-21.98,18.11-46.12,30.88-71.59,12.01-23.96,24.57-45.39,36.65-64.09-.14,9.01-.29,18.02-.43,27.03-9.62,14.18-19.46,29.99-29.06,47.44Z"
        style={getPartStyle('Windschutzscheibe')}
        onClick={() => handlePartClick('Windschutzscheibe')}
        onMouseEnter={(e) => handlePartHover('Windschutzscheibe', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M504.92,752.13l6.83,13.57c.51,1.01,1.16,1.92,1.91,2.74-5.15-3.34-10.6-7.04-16.15-11.04-3.84-2.77-10-7.24-16.73-12.85-6.56-5.46-15.07-13.15-24.34-23.41,5.59,2.09,11.17,4.19,16.76,6.28l31.72,24.7Z"
        style={getPartStyle('Heckscheibe')}
        onClick={() => handlePartClick('Heckscheibe')}
        onMouseEnter={(e) => handlePartHover('Heckscheibe', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-7" d="M534.68,275.46l-26.88,371.41c-.59,8.14-4.09,15.8-9.86,21.58l-17.28,17.28c-3.3,3.3-8.95,1.46-9.69-3.15-7.74-48.45-11.26-89.99-12.92-122.04-6.17-118.68,10.2-160.95,14.88-172.23,4.24-10.23,13.71-30.81,25.83-53.34,13.56-25.21,26.41-45.39,35.93-59.51Z"
      />
      <path className="cls-4" d="M462.71,468.72c1.83-28.34,5.97-57.72,14.62-78.58,4.39-10.59,13.73-30.8,25.62-52.91,7.99-14.86,16.58-29.53,25.64-43.76l-11.94,164.98c-15.39,2.89-40.62,7.71-53.94,10.26Z"
        style={getPartStyle('Seitenscheibe (vorne rechts)')}
        onClick={() => handlePartClick('Seitenscheibe (vorne rechts)')}
        onMouseEnter={(e) => handlePartHover('Seitenscheibe (vorne rechts)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M476.33,682.58c-.37-.12-.58-.37-.65-.75-4.35-27.22-7.73-54.7-10.12-82.09l39.37,20.69-1.89,26.09c-.51,7-3.52,13.58-8.48,18.54l-17.28,17.28c-.27.27-.59.35-.95.23Z"
        style={getPartStyle('Seitenscheibe (hinten rechts)')}
        onClick={() => handlePartClick('Seitenscheibe (hinten rechts)')}
        onMouseEnter={(e) => handlePartHover('Seitenscheibe (hinten rechts)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M464.46,586.17c-.65-8.65-1.21-17.28-1.65-25.88-.91-17.43-1.37-34.13-1.37-49.64,0-6.01.07-12.38.25-18.97l52.66-1.46-8.23,113.69-41.66-17.74Z"
        style={getPartStyle('Seitenscheibe (hinten rechts)')}
        onClick={() => handlePartClick('Seitenscheibe (hinten rechts)')}
        onMouseEnter={(e) => handlePartHover('Seitenscheibe (hinten rechts)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-2" d="M523.26,321.48l5.8,8.58c2.84-3.51,5.69-7.02,8.53-10.53.05-.26.5-2.71-1.26-4.63-1.49-1.62-3.47-1.68-3.81-1.68l-9.26,8.26"
        style={getPartStyle('Rechter Außenspiegel')}
        onClick={() => handlePartClick('Rechter Außenspiegel')}
        onMouseEnter={(e) => handlePartHover('Rechter Außenspiegel', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-7" d="M510.92,343.16c-.35-2.32-.29-5.02-.23-7.34.15-6.28.31-13.08,4.29-15.65,3.07-1.99,6.98-.54,9.28,1.32,4.65,3.74,6.11,11.79,4.1,17.5-5.85,1.13-11.66,2.51-17.44,4.18Z"
        style={getPartStyle('Rechter Außenspiegel')}
        onClick={() => handlePartClick('Rechter Außenspiegel')}
        onMouseEnter={(e) => handlePartHover('Rechter Außenspiegel', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-9" d="M457.33,479.62l62.97-5.41c4.51-1.2,11.04-2.79,19.02-4.21,0,0,13.74-2.45,29.9-3.37,32.53-1.86,69.14,2.19,71.34,2.42"
      />
      <path className="cls-9" d="M532.46,306.16c3.01-1.04,7.38-2.44,12.75-3.75,10.41-2.55,24.79-4.82,50.95-3.37,12.32.68,28.21,2.25,46.78,5.83"
      />
      <path className="cls-9" d="M546.75,161.76c-2.08,10.63-3.97,21.67-5.61,33.13-4.21,29.39-6.14,56.96-6.58,82.26"
      />
      <path className="cls-4" d="M547.06,162.31c-.03-.17-.04-.33-.01-.5,1.2-8.11,3.33-17.93,7.18-28.7,3.53-9.88,7.69-18.26,11.68-25.1.76-1.31,2.77-.75,2.73.76-.17,6.51-.55,13.28-1.19,20.29-2.13,23.27-6.67,43.94-11.98,61.62-.44,1.46-2.54,1.35-2.83-.15-1.86-9.4-3.71-18.81-5.57-28.21Z"
        style={getPartStyle('Frontscheinwerfer rechs')}
        onClick={() => handlePartClick('Frontscheinwerfer rechs')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer rechs', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-9" d="M540.17,752.74c12.45,6.1,24.63,11.28,36.34,15.69,1.08,3.55,2.15,7.1,3.23,10.65"
      />
      <path className="cls-9" d="M454.44,695.76c5.58,4.89,11.46,9.75,17.64,14.55,14.98,11.63,30.09,21.6,45,30.17"
      />
      <path className="cls-7" d="M614.6,106.78l-5.37,22.75c-.87,3.7,1.31,7.44,5,8.56l5.68,1.73c4.49,1.37,9.12-1.71,9.51-6.32l2.01-23.69c.28-3.3-1.75-6.37-4.93-7.45-.75-.25-1.49-.51-2.24-.76-.03,0-.05-.02-.08-.03-4.13-1.4-8.59,1.02-9.58,5.21Z"
        style={getPartStyle('Frontscheinwerfer rechs')}
        onClick={() => handlePartClick('Frontscheinwerfer rechs')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer rechs', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M619.12,134.11c-4.01,0-7.26-1.39-7.26-3.1s3.25-3.1,7.26-3.1,7.26,1.39,7.26,3.1-3.25,3.1-7.26,3.1Z"
        style={getPartStyle('Frontscheinwerfer rechs')}
        onClick={() => handlePartClick('Frontscheinwerfer rechs')}
        onMouseEnter={(e) => handlePartHover('Frontscheinwerfer rechs', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <line className="cls-9" x1="460.49" y1="596.61" x2="465.56" y2="599.74"
      />
      <path className="cls-9" d="M642.94,304.32c-1.33,91.83-2.67,183.67-4,275.5-34.5,1.55-63.24,26.84-68.89,59.89-5.28,30.85,10.63,62.24,39.3,76.78-2.15,24.2-4.3,48.4-6.44,72.61"
      />
      <path className="cls-9" d="M642.42,89.85l-2.75,63.92c-5.09.04-32.51.78-52.55,22.71-15.39,16.83-17.4,36.26-18,43-.45,5.04-1.77,25.5,10.33,46,19.88,33.68,58.81,38.35,63.5,38.83v-13.34"
      />
      <path className="cls-7" d="M550.64,453.58c-1.58-.03-2.74-7.65-2.59-17.02.16-9.37,1.57-16.95,3.15-16.92,1.58.03,2.74,7.65,2.59,17.02-.16,9.37-1.57,16.95-3.15,16.92Z"
        style={getPartStyle('Griffschalen (vorne rechts)')}
        onClick={() => handlePartClick('Griffschalen (vorne rechts)')}
        onMouseEnter={(e) => handlePartHover('Griffschalen (vorne rechts)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-7" d="M539.34,628.88c-1.58-.03-2.74-7.65-2.59-17.02.16-9.37,1.57-16.95,3.15-16.92,1.58.03,2.74,7.65,2.59,17.02-.16,9.37-1.57,16.95-3.15,16.92Z"
        style={getPartStyle('Griffschalen (hinten rechts)')}
        onClick={() => handlePartClick('Griffschalen (hinten rechts)')}
        onMouseEnter={(e) => handlePartHover('Griffschalen (hinten rechts)', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <line className="cls-7" x1="562" y1="115.16" x2="555.31" y2="98.6"
      />
      <path
        className="cls-5"
        d="M647.6,278.03c29.32,0,53.09-24.35,53.09-54.39s-23.77-54.39-53.09-54.39c-29.32,0-53.09,24.35-53.09,54.39,0,30.04,23.77,54.39,53.09,54.39Z"
        style={getPartStyle('Vorderrad rechts')}
        onClick={() => handlePartClick('Vorderrad rechts')}
        onMouseEnter={(e) => handlePartHover('Vorderrad rechts', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-2" d="M647.6,264.94c22.26,0,40.31-18.49,40.31-41.3s-18.05-41.3-40.31-41.3c-22.26,0-40.31,18.49-40.31,41.3s18.05,41.3,40.31,41.3Z"
      />
      <g>
        <ellipse
          className="cls-5"
          cx="647.6"
          cy="651.07"
          rx="53.09"
          ry="54.39"
          style={getPartStyle('Hinterrad rechts')}
          onClick={() => handlePartClick('Hinterrad rechts')}
          onMouseEnter={(e) => handlePartHover('Hinterrad rechts', e)}
          onMouseLeave={handlePartLeave}
          onMouseMove={handleMouseMove}
        />
        <ellipse className="cls-2" cx="647.6" cy="651.07" rx="40.31" ry="41.3"
        />
      </g>
      <path className="cls-9" d="M504.93,620.43l4.56,3.09c2.8,2.07,7.11,4.81,12.84,6.77,4.39,1.5,9.61,2.55,23.3,2.25,6.88-.15,15.95-.65,26.64-2.06"
      />
      <line className="cls-9" x1="586.92" y1="176.83" x2="564.89" y2="149.49"
      />
      <path className="cls-4" d="M531.97,726l13.32,43.4c-3.97.88-8.95,1.62-14.82,1.68-4.59.05-8.77-.32-12.38-.84l-2.01-59.55c-.07-2.2,2.58-3.35,4.13-1.79l3.71,3.71c3.73,3.74,6.5,8.34,8.05,13.39Z"
        style={getPartStyle('Heckscheinwerfer rechts')}
        onClick={() => handlePartClick('Heckscheinwerfer rechts')}
        onMouseEnter={(e) => handlePartHover('Heckscheinwerfer rechts', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <line className="cls-9" x1="638.94" y1="579.82" x2="638.94" y2="585.71"
      />
      <path className="cls-4" d="M223.82,751.73l46.22,8.14-13.47,23.58c-16.24,1.4-29.8-6.04-33.41-16.84-1.88-5.62-.71-11.12.66-14.88Z"
        style={getPartStyle('Heckscheinwerfer links')}
        onClick={() => handlePartClick('Heckscheinwerfer links')}
        onMouseEnter={(e) => handlePartHover('Heckscheinwerfer links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M478.36,751.73l-46.22,8.14,13.47,23.58c16.24,1.4,29.8-6.04,33.41-16.84,1.88-5.62.71-11.12-.66-14.88Z"
        style={getPartStyle('Heckscheinwerfer rechts')}
        onClick={() => handlePartClick('Heckscheinwerfer rechts')}
        onMouseEnter={(e) => handlePartHover('Heckscheinwerfer rechts', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
      <path className="cls-4" d="M257.04,854.34l-11.76,8.18c-1.67,1.16-3.65,1.78-5.68,1.78h-22.41c2.74-2.64,7.47-6.5,14.32-9.03,11.47-4.22,21.61-2.01,25.53-.93Z"
        style={getPartStyle('Heckscheinwerfer links')}
        onClick={() => handlePartClick('Heckscheinwerfer links')}
        onMouseEnter={(e) => handlePartHover('Heckscheinwerfer links', e)}
        onMouseLeave={handlePartLeave}
        onMouseMove={handleMouseMove}
      />
    </svg>

      {/* Tooltip */}
      {hoveredPart && (
        <div
          style={{
            position: 'fixed',
            left: mousePosition.x + 10,
            top: mousePosition.y - 30,
            background: 'var(--dark-gray)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 1000,
            whiteSpace: 'nowrap'
          }}
        >
          {hoveredPart}
        </div>
      )}
    </div>
  );
};

export default InteractiveCarSVG;
