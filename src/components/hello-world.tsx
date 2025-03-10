interface HelloWorldProps {
  name: string;
}

export function HelloWorld(props: HelloWorldProps) {
  console.log('HelloWorld', props.name);
  return <div>HelloWorld {props.name}</div>;
}
