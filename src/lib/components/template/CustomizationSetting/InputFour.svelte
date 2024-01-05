<script lang="ts">
	import IconCheckbox from "$lib/components/form/IconCheckbox.svelte";
	import InputStroke from "./InputStroke.svelte";
	import LinkBroken from "$lib/components/icon/LinkBroken.svelte";
  
  import { LinkIcon } from "svelte-feather-icons";
	import type { EventOnChange, InputType, Stroke } from "./InputStroke.svelte";

  export let inputType: InputType[] = ["color", "input", "stroke"];
  export let isLinked: boolean = true;
  
  type Position = "top" | "bottom" | "left" | "right";


  interface Value { 
    color: string;
    input: number;
    stroke: Stroke;
  }

  const defaultValue: Value = {
    color: "#000",
    input: 0,
    stroke: "solid"
  }

  const lastValue: Value = {
    ...defaultValue
  }

  export let values: Record<Position, Value> = {
    top: {...defaultValue},
    bottom: {...defaultValue},
    left: {...defaultValue},
    right: {...defaultValue}
  }

  export let hasColorInput: boolean = true;
  export let hasNumberInput: boolean = true;
  export let hasStrokeInput: boolean = true;

  function handleChange(pos: Position) {
    return function handleEvent(event: { detail: EventOnChange }) {
      // @ts-expect-error
      lastValue[event.detail.type] = event.detail.value;

      if( !isLinked ) return;
      if( event.detail.type === "color" ) {
        values.top.color = event.detail.value;
        values.bottom.color = event.detail.value;
        values.left.color = event.detail.value;
        values.right.color = event.detail.value;
      }

      if( event.detail.type === "input" ) {
        values.top.input = event.detail.value;
        values.bottom.input = event.detail.value;
        values.left.input = event.detail.value;
        values.right.input = event.detail.value;
      }

      if( event.detail.type === "stroke" ) {
        values.top.stroke = event.detail.value;
        values.bottom.stroke = event.detail.value;
        values.left.stroke = event.detail.value;
        values.right.stroke = event.detail.value;
      }
    }
  }


  function handleSyncAllInputs() {
    values.top.color = lastValue.color;
    values.bottom.color = lastValue.color;
    values.left.color = lastValue.color;
    values.right.color = lastValue.color;
    
    values.top.input = lastValue.input;
    values.bottom.input = lastValue.input;
    values.left.input = lastValue.input;
    values.right.input = lastValue.input;

    values.top.stroke = lastValue.stroke;
    values.bottom.stroke = lastValue.stroke;
    values.left.stroke = lastValue.stroke;
    values.right.stroke = lastValue.stroke;
  }

</script>

<div class="input-four-container">
  
  <div class="top">
    <InputStroke
      hasColorInput={hasColorInput}
      hasNumberInput={hasNumberInput}
      hasStrokeInput={hasStrokeInput}
      colorValue={values.top.color}
      inputValue={values.top.input}
      strokeValue={values.top.stroke}
      on:change={handleChange("top")}
    />
  </div>
  <div class="middle">
    <div class="left">
      <InputStroke
        hasColorInput={hasColorInput}
        hasNumberInput={hasNumberInput}
        hasStrokeInput={hasStrokeInput}
        colorValue={values.left.color}
        inputValue={values.left.input}
        strokeValue={values.left.stroke}
        on:change={handleChange("left")}
      />
    </div>
    <div class="link">
      <IconCheckbox bind:isChecked={isLinked} on:checked={handleSyncAllInputs}>
        <div slot="unchecked">
          <LinkBroken size="20"/>
        </div>
        <div slot="checked">
          <LinkIcon size="20" />
        </div>
      </IconCheckbox>
    </div>
    <div class="right">
      <InputStroke
        hasColorInput={hasColorInput}
        hasNumberInput={hasNumberInput}
        hasStrokeInput={hasStrokeInput}
        colorValue={values.right.color}
        inputValue={values.right.input}
        strokeValue={values.right.stroke}
        on:change={handleChange("right")}
      />
    </div>
  </div>
  <div class="bottom">
    <InputStroke
      hasColorInput={hasColorInput}
      hasNumberInput={hasNumberInput}
      hasStrokeInput={hasStrokeInput}
      colorValue={values.bottom.color}
      inputValue={values.bottom.input}
      strokeValue={values.bottom.stroke}
      on:change={handleChange("bottom")}
    />
  </div>
</div>


<style lang="postcss">
  .input-four-container {
    @apply flex flex-col;
    @apply items-center;
    @apply gap-y-4;
    @apply w-full;
  }
  .middle {
    @apply flex justify-between;
    @apply w-full;

  }
  
  .top,
  .bottom {
    @apply flex justify-center;
  }
</style>