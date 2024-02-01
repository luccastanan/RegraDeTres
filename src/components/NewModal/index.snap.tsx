// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`NewModal snapshot Should be able to render 1`] = `
[
  <View
    style={
      [
        {
          "backgroundColor": "rgba(0, 0, 0, 0.5)",
          "bottom": 0,
          "left": 0,
          "position": "absolute",
          "right": 0,
          "top": 0,
        },
        {
          "opacity": 1,
        },
      ]
    }
  >
    <View
      accessibilityLabel="new-modal-backdrop"
      accessible={true}
      collapsable={false}
      focusable={true}
      onClick={[Function]}
      onResponderGrant={[Function]}
      onResponderMove={[Function]}
      onResponderRelease={[Function]}
      onResponderTerminate={[Function]}
      onResponderTerminationRequest={[Function]}
      onStartShouldSetResponder={[Function]}
      style={
        {
          "flexBasis": 0,
          "flexGrow": 1,
          "flexShrink": 1,
          "opacity": 1,
        }
      }
    />
  </View>,
  <View
    enabled={false}
    onGestureEvent={[Function]}
    onHandlerStateChange={[Function]}
  >
    <View
      accessibilityLabel="new-modal-container"
      isFullScreen={false}
      style={
        [
          {
            "bottom": 0,
            "left": 0,
            "position": "absolute",
            "right": 0,
          },
          {
            "transform": [
              {
                "translateY": 0,
              },
            ],
          },
        ]
      }
    >
      <RNCSafeAreaView
        edges={
          [
            "bottom",
          ]
        }
        style={
          [
            {
              "backgroundColor": "#FFFFFF",
              "borderTopLeftRadius": 16,
              "borderTopRightRadius": 16,
              "flexBasis": 0,
              "flexGrow": 1,
              "flexShrink": 1,
            },
            {
              "elevation": 1,
              "shadowColor": "#1C1F24",
              "shadowOffset": {
                "height": -4,
                "width": 0,
              },
              "shadowOpacity": 0.1,
            },
          ]
        }
      >
        <View
          style={
            [
              {
                "alignItems": "center",
                "justifyContent": "center",
                "marginTop": 8,
              },
            ]
          }
        >
          <View
            style={
              [
                {
                  "backgroundColor": "#DBDFE5",
                  "borderRadius": 4,
                  "height": 4,
                  "width": 32,
                },
              ]
            }
          />
        </View>
        <View
          accessibilityLabel="new-modal-header-container"
          style={
            [
              {
                "alignItems": "center",
                "backgroundColor": "#FFFFFF",
                "borderBottomColor": "#DBDFE5",
                "borderBottomWidth": 1,
                "flexDirection": "row",
                "height": 56,
                "justifyContent": "space-between",
                "paddingBottom": 0,
                "paddingLeft": 8,
                "paddingRight": 8,
                "paddingTop": 0,
                "width": "100%",
              },
            ]
          }
        >
          <IconButton
            accessibilityLabel="new-modal-header-close-button"
            appearanceStyle="ghost"
            icon={<Styled(Close) />}
            onPress={[Function]}
            style={
              [
                {},
              ]
            }
          />
        </View>
        <View
          accessibilityLabel="new-modal-children"
          style={
            [
              {
                "flexBasis": 0,
                "flexGrow": 1,
                "flexShrink": 1,
              },
            ]
          }
        >
          <Text
            color="neutral500"
            fontWeight="thin"
            size="H6"
            textAlign="left"
            type="default"
          >
            Novas funções para acessibilidade foram disponibilizadas
          </Text>
        </View>
      </RNCSafeAreaView>
    </View>
  </View>,
]
`;
