function processSpans(formData) {
  const spans = [];
  for (const spanData of formData.resourceSpans) {
    for (const span of spanData.scopeSpans) {
      const { scope } = span;
      for (const s of span.spans) {
        const error_code = scope && scope.name === 'errorTracer' ? 1 : 0;
        const error =
          error_code === 1
            ? s.attributes?.find((el) => el.key === 'errMsg')?.value?.stringValue
            : null;
        const name = s.attributes?.find((el) => el.key === 'route')?.value
          ?.stringValue;
        const {
          attributes,
          droppedAttributesCount,
          events,
          droppedEventsCount,
          status,
          links,
          droppedLinksCount,
          ...rest
        } = s;
        spans.push({ ...rest, error_code, error, name: name || rest.name });
      }
    }
  }
  return spans;
}

module.exports = {
  processSpans,
};
