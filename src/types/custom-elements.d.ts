declare namespace JSX {
    interface IntrinsicElements {
      'embeddable-voice': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string;
      }
    }
  }